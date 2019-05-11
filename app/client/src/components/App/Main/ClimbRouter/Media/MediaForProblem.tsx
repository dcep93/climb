import React from "react";

import { Link } from "react-router-dom";

import g, * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import Media from ".";
import styles from "./index.module.css";
import profile_styles from "../Profile/index.module.css";

function problemLink(
	m: gt.mediaType,
	usersDict: { [id: number]: gt.userType }
) {
	return (
		<Link to={`/user/${m.user_id}`}>
			<div className={gs.margin}>
				<img
					className={`${profile_styles.profile_pic} ${gs.inline}`}
					src={usersDict[m.user_id].image}
				/>
				<div className={`${gs.inline} ${styles.link_info}`}>
					<span>
						{usersDict[m.user_id].name} ({m.user_id})
					</span>
					<br />
					<span>
						{g.formatDate(new Date(m.timestamp).toString())} ({m.id}
						)
					</span>
				</div>
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
