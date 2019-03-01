var request = require("request-promise");

var config = require("../../config");
var orm = require("../climb/orm");

var GET_MEDIA_INTERVAL = 3000;
var MAX_MEDIA_TRIES = 100;
var MEDIA_TRIES_PRINT_INTERVAL = 10;

var access_token = config.facebook_page_access_token;
var storage_path = `https://storage.googleapis.com/${config.gcs_bucket_id}`;

function uploadToFacebook(wall_media_id, mime, gcs_path) {
	var vars = { wall_media_id, mime, gcs_path, get_media_tries: 0 };
	return Promise.resolve(vars)
		.then(getVars)
		.then(uploadRequest)
		.then(getMedia)
		.then(write)
		.then(deleteFromGCS)
		.then(finish)
		.catch(catchF.bind(null, vars));
}

function catchF(vars, err) {
	var message = err.message;
	var short_err = message.split("/")[0];
	return orm
		.update(
			"wall_media",
			{ mime: `${vars.mime} - ${short_err}`, data: message },
			{ id: vars.wall_media_id }
		)
		.then(() => {
			throw err;
		});
}

function fail(note, data) {
	throw new Error(`${note}/${data}`);
}

function getVars(vars) {
	var endpoint;
	var upload_field;
	var fields_to_get;
	var handleGetResponse;
	if (vars.mime === "image") {
		endpoint = "https://graph.facebook.com/v3.2/me/photos";
		upload_field = "url";
		fields_to_get = "images,width,height";
		handleGetResponse = imageGetResponse;
	} else if (vars.mime === "video") {
		endpoint = "https://graph-video.facebook.com/v3.2/me/videos";
		upload_field = "file_url";
		fields_to_get = "permalink_url,format,status";
		handleGetResponse = videoGetResponse;
	} else {
		fail(`bad mime ${vars.mime}`);
	}
	return Object.assign(vars, {
		endpoint,
		upload_field,
		fields_to_get,
		handleGetResponse: handleGetResponse.bind(null, vars)
	});
}

function imageGetResponse(vars, raw_response) {
	var response = JSON.parse(raw_response);
	var images = response.images;
	if (!images) fail("no images", raw_response);
	var first_image = images[0];
	if (!first_image) fail("no first image", raw_response);
	var img_source = first_image.source;
	if (!img_source) fail("no source", raw_response);
	var height = response.height;
	var width = response.width;
	if (!height || !width)
		fail(`bad dimensions - ${width}x${height}`, raw_response);
	return Object.assign(vars, { data: img_source, height, width });
}

function videoGetResponse(vars, raw_response) {
	// TODO dont make client wait
	var response = JSON.parse(raw_response);
	var perma_link = response.permalink_url;
	if (!perma_link) fail("no permalink", raw_response);
	var status = response.status;
	if (!status) fail("no status", raw_response);
	var video_status = status.video_status;
	if (!video_status) fail("no video status", raw_response);
	if (video_status === "ready") {
		var formats = response.format;
		if (!formats) fail("no formats", raw_response);
		var last_format = formats[formats.length - 1];
		if (!last_format) fail("no last format", raw_response);
		var height = last_format.height;
		var width = last_format.width;
		if (!height || !width)
			fail(`bad dimensions - ${width}x${height}`, raw_response);
		return Object.assign(vars, { data: perma_link, height, width });
	} else if (video_status === "processing") {
		var processing_progress = status.processing_progress;
		if (processing_progress === undefined)
			fail("undefined progress", raw_response);

		return orm
			.update(
				"wall_media",
				{
					mime: `${vars.mime} - processing ${processing_progress}%`,
					data: perma_link
				},
				{ id: vars.wall_media_id }
			)
			.then(() => {
				if (++vars.get_media_tries === MAX_MEDIA_TRIES)
					fail("max retries");
				if (vars.get_media_tries % MEDIA_TRIES_PRINT_INTERVAL === 0)
					console.log(
						`processing ${processing_progress}% ${vars.media_id} ${
							vars.get_media_tries
						}`
					);
				return new Promise((resolve, reject) => {
					setTimeout(() => resolve(vars), GET_MEDIA_INTERVAL);
				}).then(getMedia);
			});
	} else {
		fail(`bad video status ${video_status}`, raw_response);
	}
}

function uploadRequest(vars) {
	return request({
		uri: vars.endpoint,
		method: "POST",
		qs: {
			access_token,
			[vars.upload_field]: `${storage_path}/${vars.gcs_path}`
		}
	})
		.catch(err => fail("post", err))
		.then(response => {
			var media_id = JSON.parse(response).id;
			if (!media_id) fail("no media id", response);
			return Object.assign(vars, { media_id });
		});
}

function getMedia(vars) {
	vars.get_media_tries++;
	return request({
		uri: `https://graph.facebook.com/v3.2/${vars.media_id}`,
		method: "GET",
		qs: {
			access_token,
			fields: vars.fields_to_get
		}
	})
		.catch(err => fail("get", err))
		.then(vars.handleGetResponse);
}

function write(vars) {
	return orm
		.update(
			"wall_media",
			{
				mime: vars.mime,
				data: vars.data,
				height: vars.height,
				width: vars.width
			},
			{ id: vars.wall_media_id }
		)
		.then(() => vars);
}

function deleteFromGCS(vars) {
	return vars;
}

function finish(vars) {
	console.log(
		`finished ${vars.mime} ${vars.media_id} ${vars.get_media_tries}`
	);
}

module.exports = uploadToFacebook;