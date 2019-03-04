import React, { Component } from "react";
import { Link } from "react-router-dom";

import NewWall from "./NewWall";
import EditWall from "./EditWall";

import g from "../../../../globals";
import * as gt from "../../../../globals";

interface PropsType {
	gym: gt.gymType & { walls: gt.wallType[] };
}
class GymEdit extends Component<PropsType, gt.gymType> {
	constructor(props: PropsType) {
		super(props);
		this.state = Object.assign({}, props.gym);
	}

	submit = (event: React.MouseEvent<HTMLInputElement>): void => {
		event.preventDefault();
		g.req(`/gym/${this.props.gym.path}/edit`, "POST", this.state).then(
			g.refresh
		);
	};

	render() {
		return (
			<div>
				<Link to={"/"}>Home</Link>
				<div>
					<p>
						name: <input {...g.input(this, "name")} />
					</p>
					<p>
						description:{" "}
						<textarea {...g.input(this, "description")} />
					</p>
					<input type="submit" onClick={this.submit} />
				</div>
				<div>
					<p>Walls</p>
					<br />
					<NewWall gym_path={this.props.gym.path} />
					{this.props.gym.walls.map(wall => (
						<EditWall
							gym_path={this.props.gym.path}
							key={wall.id}
							{...wall}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default GymEdit;
