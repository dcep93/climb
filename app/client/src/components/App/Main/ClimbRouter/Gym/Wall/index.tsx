import React from "react";

import Media from "./Media";
import { Link } from "react-router-dom";

import * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

function Wall(props: { wall: gt.wallType & { media: gt.mediaType[] } }) {
	return (
		<div>
			<div className={gs.margin}>
				<Link to={`/gym/${props.wall.gym_path}`}>To Gym Page</Link>
			</div>
			<br />
			<div className={`${gs.bubble} ${gs.inline}`}>
				<p>id: {props.wall.id}</p>
				<p>name: {props.wall.name}</p>
				<p>difficulty: {props.wall.difficulty}</p>
				<p>location: {props.wall.location}</p>
				<p>date: {new Date(props.wall.date).toDateString()}</p>
				<p>setter: {props.wall.setter}</p>
				<p>color: {props.wall.color}</p>
				<p>status: {props.wall.active ? "active" : "retired"}</p>
			</div>
			<br />

			<Media
				gym_path={props.wall.gym_path}
				wall_id={props.wall.id}
				media={props.wall.media}
			/>
		</div>
	);
}

export default Wall;
