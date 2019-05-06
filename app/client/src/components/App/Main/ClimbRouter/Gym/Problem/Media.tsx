import React, { RefObject } from "react";

import g from "../../../../../../globals";
import * as gt from "../../../../../../globals";

const new_media_ref: RefObject<HTMLInputElement> = React.createRef();

function newMedia(gym_path: string, problem_id: number) {
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
				<div>
					<input ref={new_media_ref} type="file" name="upload" />
					<input
						type="submit"
						onClick={event =>
							submitNewMedia(gym_path, problem_id, event)
						}
					/>
				</div>
			</div>
		);
	}
}

function submitNewMedia(
	gym_path: string,
	problem_id: number,
	event: React.MouseEvent<HTMLInputElement>
) {
	event.preventDefault();
	const input = new_media_ref.current;
	if (input === null) return;
	const files = input.files;
	if (!files) return;
	const file = files[0];
	const mime = file.type.split("/")[0];
	const acceptable_media = ["image", "video"];
	if (acceptable_media.indexOf(mime) === -1) return alert("invalid file");
	let gcs_key: string;
	g.req("/get_gcs_key")
		.then(response => response.json())
		.then(response => {
			gcs_key = response.token;
			const folder = response.folder;
			const bucket = response.bucket;

			const name = `${folder}/${new Date().getTime()}_${file.name}`;
			const endpoint = `https://www.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${name}`;

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
			g.req(`/gym/${gym_path}/problem/${problem_id}/upload`, "POST", {
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
		const href = encodeURIComponent(`https://www.facebook.com${m.data}`);
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

function Media(props: {
	gym_path: string;
	problem_id: number;
	media: gt.mediaType[];
}) {
	return (
		<div>
			<p>Media</p>
			<br />
			{newMedia(props.gym_path, props.problem_id)}
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
