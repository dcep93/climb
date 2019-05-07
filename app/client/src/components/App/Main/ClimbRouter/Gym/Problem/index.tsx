import React from "react";

import Media from "./Media";
import { Link } from "react-router-dom";

import g from "../../../../../../globals";
import * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

function Problem(props: {
	problem: gt.problemType & {
		media: gt.mediaType[];
		gym_name: string;
		users: gt.userType[];
	};
}) {
	return (
		<div>
			<div className={gs.flex}>
				<div className={`${gs.bubble} ${gs.inline}`}>
					<p>
						{props.problem.name} ({props.problem.id})
					</p>
					<p>
						<Link to={`/gym/${props.problem.gym_path}`}>
							To {props.problem.gym_name}
						</Link>
					</p>
					<p>
						<label>
							<span>{props.problem.difficulty} </span>
							<input type={"checkbox"} />
						</label>
					</p>
					<p>{g.formatDate(props.problem.date)}</p>
					<p>
						{props.problem.location}
						{Boolean(props.problem.active) && (
							<span> (retired)</span>
						)}
					</p>
					<p>
						{props.problem.color}
						{Boolean(props.problem.setter) && (
							<span> - set by {props.problem.setter}</span>
						)}
					</p>
				</div>
				{Media.newMedia(props.problem.gym_path, props.problem.id)}
			</div>

			<Media
				gym_path={props.problem.gym_path}
				problem_id={props.problem.id}
				media={props.problem.media}
				users={props.problem.users}
			/>
		</div>
	);
}

export default Problem;
