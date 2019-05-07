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
	};
}

interface StateType {
	filters: any;
}

class Gym extends Component<PropsType, StateType> {
	updateFilter(filters: any) {
		this.setState({ filters });
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
				<Filters updateFilter={this.updateFilter.bind(this)} />
				<GymProblems
					{...this.props}
					filters={this.state && this.state.filters}
				/>
			</div>
		);
	}
}

export default Gym;
