import React, { Component } from "react";

import NewProblem from "./NewProblem";
import EditProblem from "./EditProblem";

import g, * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

interface PropsType {
	gym: gt.gymType;
	problems: gt.problemType[];
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
						<div className={gs.vertical_space_20} />
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
					<NewProblem gym_path={this.props.gym.path} />
				</div>
				<div className={gs.flex}>
					{this.props.problems.map(problem => (
						<EditProblem
							key={problem.id}
							gym_path={this.props.gym.path}
							{...problem}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default GymEdit;
