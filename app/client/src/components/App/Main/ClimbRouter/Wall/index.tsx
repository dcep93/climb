import React from "react";

import Media from "./Media";

import * as gt from "../../../../../globals";

function Wall(props: { wall: gt.wallType & { media: gt.mediaType[] } }) {
	return (
		<div>
			<p>id: {props.wall.id}</p>
			<p>name: {props.wall.name}</p>
			<p>difficulty: {props.wall.difficulty}</p>
			<p>location: {props.wall.location}</p>
			<p>date: {props.wall.date}</p>
			<p>setter: {props.wall.setter}</p>
			<p>color: {props.wall.color}</p>
			<p>status: {props.wall.active ? "active" : "retired"}</p>

			<Media media={props.wall.media} />
		</div>
	);
}

export default Wall;
