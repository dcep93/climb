import React from "react";

import { Link } from "react-router-dom";

import g, * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import Media from ".";

function profileLink(
	m: gt.mediaType,
	problemsDict: { [id: number]: gt.problemType }
) {
	return (
		<Link to={`/gym/${m.gym_path}/problem/${m.problem_id}`}>
			<div className={gs.padding}>
				<div>{problemsDict[m.problem_id].name}</div>
				<div>
					{g.formatDate(new Date(m.timestamp).toString())} ({m.id})
				</div>
			</div>
		</Link>
	);
}

function MediaForProfile(props: {
	media: gt.mediaType[];
	problems: gt.problemType[];
}) {
	const problemsDict = Media.keyById(props.problems);
	return (
		<div>
			<div>
				{props.media.map(m => (
					<div key={m.id} className={gs.bubble}>
						{profileLink(m, problemsDict)}
						{Media.mediaData(m)}
					</div>
				))}
			</div>
		</div>
	);
}

export default MediaForProfile;
