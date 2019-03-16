import React from "react";

import Media from "./Media";
import { Link } from "react-router-dom";

import g from "../../../../../../globals";
import * as gt from "../../../../../../globals";

function Wall(props: { wall: gt.wallType & { media: gt.mediaType[] } }) {
	return (
		<div>
			<Link to={`/gym/${props.wall.gym_path}`}>To Gym Page</Link>
			<p>id: {props.wall.id}</p>
			<p>name: {props.wall.name}</p>
			<p>difficulty: {props.wall.difficulty}</p>
			<p>location: {props.wall.location}</p>
			<p>date: {props.wall.date}</p>
			<p>setter: {props.wall.setter}</p>
			<p>color: {props.wall.color}</p>
			<p>status: {props.wall.active ? "active" : "retired"}</p>

			<Media
				gym_path={props.wall.gym_path}
				wall_id={props.wall.id}
				media={props.wall.media}
			/>
		</div>
	);
}

export default Wall;
