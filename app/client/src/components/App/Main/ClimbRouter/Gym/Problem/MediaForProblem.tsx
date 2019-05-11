import React from "react";

import { Link } from "react-router-dom";

import * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

import Media from "./Media";
import styles from "./Media.module.css";
import profile_styles from "../../Profile/index.module.css";

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

function MediaForProblem(props: {
	media: gt.mediaType[];
	users: gt.userType[];
}) {
	const usersDict = Media.keyById(props.users);
	return (
		<div>
			<div>
				{props.media.map(m => (
					<div key={m.id} className={gs.bubble}>
						{problemLink(m, usersDict)}
						{Media.mediaData(m)}
					</div>
				))}
			</div>
		</div>
	);
}

export default MediaForProblem;
