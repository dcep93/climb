import React, { Component } from "react";

import NewWall from "./NewWall";
import EditWall from "./EditWall";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import GymEditStyles from "./GymEdit.module.css";
import { Link } from "react-router-dom";

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
				<g.Title title={`Edit: ${this.props.gym.name}`} />
				<div className={GymEditStyles.gym_edit}>
					<Link to={`/gym/${this.props.gym.path}`}>To Gym Page</Link>
					<div className={GymEditStyles.vertical_space} />
					<p>
						name: <input {...g.input(this, "name")} />
					</p>
					<p>
						description:{" "}
						<textarea {...g.input(this, "description")} />
					</p>
					<input type="submit" onClick={this.submit} />
				</div>
				<div className={gs.flex}>
					<NewWall gym_path={this.props.gym.path} />
					{this.props.gym.walls.map(wall => (
						<EditWall
							key={wall.id}
							gym_path={this.props.gym.path}
							{...wall}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default GymEdit;
