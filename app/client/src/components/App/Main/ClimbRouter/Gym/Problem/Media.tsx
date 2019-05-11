import React, { RefObject } from "react";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import g from "../../../../../../globals";
import * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

import styles from "./Media.module.css";
import profile_styles from "../../Profile/index.module.css";

const new_media_ref: RefObject<HTMLInputElement> = React.createRef();

function newMedia(gym_path: string, problem_id: number) {
	if (g.common().user.id === undefined) {
		return (
			<div>
				<p>Login and become verified to upload media.</p>
			</div>
		);
	} else if (!g.common().user.is_verified) {
		return (
			<div>
				<p>
					Email climb.nomorerice@gmail.com with a link to your profile
					to become verified to upload media.
				</p>
			</div>
		);
	} else {
		return (
			<div>
				<p>New Media</p>
				<div>
					<input ref={new_media_ref} type="file" name="upload" />
					<br />
					<Button
						onClick={() => submitNewMedia(gym_path, problem_id)}
					>
						Submit
					</Button>
				</div>
			</div>
		);
	}
}

function submitNewMedia(gym_path: string, problem_id: number) {
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

			return new Promise((resolve, reject) => {
				let req = new XMLHttpRequest();
				req.upload.onprogress = function(e) {
					console.log(new Date(), "progress", e.loaded, e.total);
				};
				req.open("POST", endpoint);
				req.onload = function(e) {
					console.log(new Date(), "loaded");
					resolve(req);
				};
				req.setRequestHeader("Authorization", `Bearer ${gcs_key}`);
				req.setRequestHeader("Content-Type", file.type);
				req.send(file);
			}) as Promise<XMLHttpRequest>;
		})
		.then(req => req.response)
		.then(JSON.parse)
		.then(response =>
			g.req(`/gym/${gym_path}/problem/${problem_id}/upload`, "POST", {
				gcs_path: response.name,
				gym_path,
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
		const paddingPercent = (m.height * 100) / m.width;
		return (
			<div
				className={styles.video_div}
				style={{ paddingTop: `${paddingPercent}%` }}
			>
				<iframe
					className={styles.video}
					src={`https://www.facebook.com/plugins/video.php?href=${href}`}
					width={m.width}
					height={m.height}
					style={{
						border: "none"
					}}
					scrolling="no"
					allowFullScreen={true}
				/>
				<div className={gs.vertical_space_10} />
			</div>
		);
	} else if (m.mime === "image") {
		return <img className={styles.image} src={m.data} />;
	} else {
		return <pre>{m.data}</pre>;
	}
}

function profileLink(
	m: gt.mediaType,
	problemsDict: { [id: number]: gt.problemType }
) {
	return (
		<Link to={`/gym/${m.gym_path}/problem/${m.problem_id}`}>
			<div className={gs.padding}>{problemsDict[m.problem_id].name}</div>
		</Link>
	);
}

function problemLink(
	m: gt.mediaType,
	usersDict: { [id: number]: gt.userType }
) {
	return (
		<Link className={gs.margin} to={`/user/${m.user_id}`}>
			<div>
				<img
					className={`${profile_styles.profile_pic} ${gs.inline}`}
					src={usersDict[m.user_id].image}
				/>
				<p className={`${gs.inline} ${gs.margin}`}>
					{usersDict[m.user_id].name} ({m.user_id})
				</p>
			</div>
		</Link>
	);
}

function keyById(items: { id: number }[]) {
	const dict: { [id: number]: any } = {};
	items.forEach(item => {
		dict[item.id] = item;
	});
	return dict;
}

function Media(props: {
	media: gt.mediaType[];
	users: gt.userType[];
	problems: gt.problemType[];
	forProfile: boolean;
}) {
	const usersDict = keyById(props.users);
	const problemsDict = keyById(props.problems);
	return (
		<div>
			<div>
				{props.media.map(m => (
					<div key={m.id} className={gs.bubble}>
						{props.forProfile
							? profileLink(m, problemsDict)
							: problemLink(m, usersDict)}
						{mediaData(m)}
					</div>
				))}
			</div>
		</div>
	);
}

Media.newMedia = newMedia;

export default Media;
