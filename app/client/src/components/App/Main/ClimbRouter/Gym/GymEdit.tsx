import React, { Component } from "react";

import NewWall from "./NewWall";
import EditWall from "./EditWall";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface PropsType {
	gym: gt.gymType & { walls: gt.wallType[] };
}
class GymEdit extends Component<PropsType, gt.gymType> {
	constructor(props: PropsType) {
		super(props);
		this.state = Object.assign({}, props.gym);
	}

	submit = (): void => {
		g.req(`/gym/${this.props.gym.path}/edit`, "POST", this.state).then(
			g.refresh
		);
	};

	render() {
		return (
			<div>
				<g.Title title={`Edit: ${this.props.gym.name}`} />
				<div>
					<div className={`${gs.bubble} ${gs.inline}`}>
						<Link to={`/gym/${this.props.gym.path}`}>
							To Gym Page
						</Link>
						<div className={gs.vertical_space} />
						<p>
							name
							<br />
							<input {...g.input(this, "name")} />
						</p>
						<p>
							description
							<br />
							<textarea {...g.input(this, "description")} />
						</p>
						<Button onClick={this.submit} variant="primary">
							Edit
						</Button>
					</div>
					<br />
					<NewWall gym_path={this.props.gym.path} />
				</div>
				<div className={gs.flex}>
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
