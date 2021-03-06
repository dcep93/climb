import React, { Component } from "react";
import { Link } from "react-router-dom";

import g, * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import Filters, * as FiltersTypes from "./Filters";
import GymProblems from "./GymProblems";

interface PropsType {
	gym: gt.gymType;
	climbed_problems: number[];
	problems: gt.problemType[];
	pictures: { picture: string; problem_id: number }[];
}

class Gym extends Component<PropsType, FiltersTypes.StateType> {
	constructor(props: PropsType) {
		super(props);
		let pictures: { [problem_id: number]: string } = {};
		props.pictures.forEach(picture => {
			pictures[picture.problem_id] = picture.picture;
		});
		props.problems.forEach(problem => {
			problem.picture = pictures[problem.id];
		});
	}

	updateFilter(filters: any) {
		this.setState(filters);
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
					problemsBank={this.props.problems}
					updateFilter={this.updateFilter.bind(this)}
				/>
				<GymProblems
					{...this.props}
					shouldDisplayProblem={problem =>
						Filters.shouldDisplayProblem(
							problem,
							this.state,
							this.props.climbed_problems
						)
					}
				/>
			</div>
		);
	}
}

export default Gym;
