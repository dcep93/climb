import React from "react";

import Media from "./Media";
import { Link } from "react-router-dom";

import * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

function Problem(props: {
	problem: gt.problemType & { media: gt.mediaType[] };
}) {
	return (
		<div>
			<div className={gs.margin}>
				<Link to={`/gym/${props.problem.gym_path}`}>To Gym Page</Link>
			</div>
			<div className={`${gs.bubble} ${gs.inline}`}>
				<p>id: {props.problem.id}</p>
				<p>name: {props.problem.name}</p>
				<p>difficulty: {props.problem.difficulty}</p>
				<p>location: {props.problem.location}</p>
				<p>date: {new Date(props.problem.date).toDateString()}</p>
				<p>setter: {props.problem.setter}</p>
				<p>color: {props.problem.color}</p>
				<p>status: {props.problem.active ? "active" : "retired"}</p>
			</div>
			<br />

			<Media
				gym_path={props.problem.gym_path}
				problem_id={props.problem.id}
				media={props.problem.media}
			/>
		</div>
	);
}

export default Problem;
