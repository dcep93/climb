var request = require("request");

var config = require("../../config");
var orm = require("../climb/orm");

var GET_MEDIA_INTERVAL = 3000;
var MAX_MEDIA_TRIES = 100;
var MEDIA_TRIES_PRINT_INTERVAL = 10;

function uploadToFacebook(wallMediaId, mime, gcsPath, gcsKey, o) {
	var endpoint;
	var uploadField;
	var fieldsToGet;
	var handleGetResponse;
	var mediaId;

	var accessToken = config.facebook_page_access_token;
	var gcsUrl = `https://storage.googleapis.com/${
		config.gcs_bucket_id
	}/${gcsPath}`;

	var getMediaTries = 0;

	function prepareVars() {
		if (mime === "image") {
			endpoint = "https://graph.facebook.com/v3.2/me/photos";
			uploadField = "url";
			fieldsToGet = "images,width,height";
			handleGetResponse = function(rawResponse) {
				var response = JSON.parse(rawResponse);
				var images = response.images;
				if (!images) return fail("no images", rawResponse);
				var firstImage = images[0];
				if (!firstImage) return fail("no first image", rawResponse);
				var imgSource = firstImage.source;
				if (!imgSource) return fail("no source", rawResponse);
				var height = response.height;
				var width = response.width;
				if (!height || !width)
					return fail(
						`bad dimensions - ${width}x${height}`,
						rawResponse
					);
				finish(imgSource, height, width);
			};
		} else if (mime === "video") {
			o.res.sendStatus(200);
			o = orm(null, null, console.error);
			endpoint = "https://graph-video.facebook.com/v3.2/me/videos";
			uploadField = "file_url";
			fieldsToGet = "permalink_url,format,status";
			handleGetResponse = function(rawResponse) {
				var response = JSON.parse(rawResponse);
				var permaLink = response.permalink_url;
				if (!permaLink) return fail("no permalink", rawResponse);
				var status = response.status;
				if (!status) return fail("no status", rawResponse);
				var videoStatus = status.video_status;
				if (!videoStatus) return fail("no video status", rawResponse);
				if (videoStatus === "ready") {
					var formats = response.format;
					if (!formats) return fail("no formats", rawResponse);
					var lastFormat = formats[formats.length - 1];
					if (!lastFormat) return fail("no last format", rawResponse);
					var height = lastFormat.height;
					var width = lastFormat.width;
					if (!height || !width)
						return fail(
							`bad dimensions - ${width}x${height}`,
							rawResponse
						);
					finish(permaLink, height, width);
				} else if (videoStatus === "processing") {
					var processingProgress = status.processing_progress;
					if (processingProgress === undefined)
						return fail("undefined progress", rawResponse);

					orm(null, null, next)
						.update(
							"wall_media",
							{
								mime: `${mime} - processing ${processingProgress}%`,
								data: permaLink
							},
							{ id: wallMediaId }
						)
						.then(() => {
							if (++getMediaTries === MAX_MEDIA_TRIES)
								return fail("max retries");
							if (
								getMediaTries % MEDIA_TRIES_PRINT_INTERVAL ===
								0
							)
								console.log(
									`processing ${processingProgress}% ${mediaId} ${getMediaTries}`
								);
							setTimeout(getMedia, GET_MEDIA_INTERVAL);
						});
				} else {
					return fail(`bad video status ${videoStatus}`, rawResponse);
				}
			};
		} else {
			return fail(`bad mime ${mime}`);
		}
	}

	function uploadMedia() {
		prepareVars();
		request(
			{
				uri: endpoint,
				method: "POST",
				qs: {
					access_token: accessToken,
					[uploadField]: gcsUrl
				}
			},
			function(error, _response, uploadBody) {
				if (error) return fail("post", error);
				mediaId = JSON.parse(uploadBody).id;
				if (!mediaId) return fail("no media id", uploadBody);
				getMedia();
			}
		);
	}

	function getMedia() {
		getMediaTries++;
		request(
			{
				uri: `https://graph.facebook.com/v3.2/${mediaId}`,
				method: "GET",
				qs: {
					access_token: accessToken,
					fields: fieldsToGet
				}
			},
			function(error, _response, getBody) {
				if (error) return fail("get", error);
				handleGetResponse(getBody);
			}
		);
	}

	function fail(mimeExtension, error) {
		if (!error) error = mimeExtension;

		orm(null, null, next)
			.update(
				"wall_media",
				{ mime: `${mime} - ${mimeExtension}`, data: error },
				{ id: wallMediaId }
			)
			.then(() => next(new Error(error)));
	}

	function finish(data, height, width) {
		orm(null, null, next)
			.update(
				"wall_media",
				{ mime, data, height, width },
				{ id: wallMediaId }
			)
			.then(() =>
				deleteFromGCS(function() {
					console.log(`finished ${mime} ${mediaId} ${getMediaTries}`);
				})
			);
	}

	function deleteFromGCS(callback) {
		// TODO
		callback();
	}

	uploadMedia();
}

module.exports = uploadToFacebook;
