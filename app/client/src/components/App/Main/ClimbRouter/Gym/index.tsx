import React, { Component } from "react";
import { Link } from "react-router-dom";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import Filters from "./Filters";
import GymProblems from "./GymProblems";

interface PropsType {
	gym: gt.gymType & {
		climbed_problems: number[];
		problems: gt.problemType[];
		pictures: { picture: string; problem_id: number }[];
	};
}

class Gym extends Component<PropsType, any> {
	constructor(props: PropsType) {
		super(props);
		let pictures: { [problem_id: number]: string } = {};
		props.gym.pictures.forEach(picture => {
			pictures[picture.problem_id] = picture.picture;
		});
		props.gym.problems.forEach(problem => {
			problem.picture = pictures[problem.id];
		});
	}

	updateFilter(filters: any) {
		this.setState(filters);
	}

	shouldDisplayProblem(problem: gt.problemType): boolean {
		return Filters.shouldDisplayProblem(problem, this.state);
	}

	render() {
		return (
			<div>
				<g.Title title={this.props.gym.name} />
				<div className={`${gs.inline} ${gs.bubble}`}>
					<h2>{this.props.gym.name}</h2>
					<div>{this.props.gym.description}</div>
					{g.common().user.is_verified && (
						<Link to={`${this.props.gym.path}/edit`}>Edit</Link>
					)}
				</div>
				<Filters
					problemsBank={this.props.gym.problems}
					updateFilter={this.updateFilter.bind(this)}
				/>
				<GymProblems
					{...this.props}
					shouldDisplayProblem={this.shouldDisplayProblem.bind(this)}
				/>
			</div>
		);
	}
}

export default Gym;
