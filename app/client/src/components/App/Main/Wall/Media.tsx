import React, { Component, RefObject, FormEvent } from "react";

import g from "../../../../globals";
import * as gt from "../../../../globals";

var new_media_ref: RefObject<HTMLInputElement> = React.createRef();

function newMedia() {
	if (g.common().user.id === undefined) {
		return <p>Create an account and become verified to upload media.</p>;
	} else if (!g.common().user.is_verified) {
		return (
			<p>
				Email climb.nomorerice@gmail.com to become verified to upload
				media.
			</p>
		);
	} else {
		return (
			<div>
				<p>New Media</p>
				<form onSubmit={submitNewMedia}>
					<input ref={new_media_ref} type="file" name="upload" />
					<input type="submit" />
				</form>
			</div>
		);
	}
}

function submitNewMedia(event: FormEvent<HTMLFormElement>) {
	event.preventDefault();
	var input = new_media_ref.current;
	if (input === null) return;
	var files = input.files;
	if (!files) return;
	var file = files[0];
	var mime = file.type.split("/")[0];
	var acceptable_media = ["image", "video"];
	if (acceptable_media.indexOf(mime) === -1) return alert("invalid file");
	var gcs_key: string;
	g.req("/api/get_gcs_key")
		.then(response => response.json())
		.then(response => {
			gcs_key = response.token;
			var folder = response.folder;
			var bucket = response.bucket;

			var name = `${folder}/${new Date().getTime()}_${file.name}`;
			var endpoint = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${name}`;

			return fetch(endpoint, {
				method: "POST",
				body: file,
				headers: {
					Authorization: `Bearer ${gcs_key}`,
					"Content-Type": file.type
					// 'Content-Length': file.size,
				}
			});
		})
		.then(response => response.json())
		.then(response =>
			g.req(`/api/${g.common().path}/upload`, "POST", {
				gcs_path: response.name,
				gcs_id: response.id,
				mime: file.type,
				size: file.size,
				gcs_key: gcs_key
			})
		)
		.then(g.refresh);
}

function mediaData(m: gt.mediaType) {
	if (!m.data) {
		return <p>received - handling</p>;
	} else if (m.mime === "video") {
		var href = encodeURIComponent(`https://www.facebook.com${m.data}`);
		return (
			<iframe
				src={`https://www.facebook.com/plugins/video.php?href=${href}`}
				width={m.width}
				height={m.height}
				style={{ border: "none", overflow: "hidden" }}
				scrolling="no"
				allowFullScreen={true}
			/>
		);
	} else if (m.mime === "image") {
		return <img src={m.data} />;
	} else {
		return <pre>{m.data}</pre>;
	}
}

function Media(props: { media: gt.mediaType[] }) {
	return (
		<div>
			<p>Media</p>
			<br />
			{newMedia()}
			<div>
				{props.media.map(m => (
					<div key={m.id}>
						<p>id: {m.id}</p>
						<p>mime: {m.mime}</p>
						{mediaData(m)}
					</div>
				))}
			</div>
		</div>
	);
}

export default Media;
