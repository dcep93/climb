import React, { Component } from "react";
import { Link } from "react-router-dom";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import Filters from "./Filters";

function formatDate(dateString: string): string {
	return new Date(dateString).toDateString();
}

interface PropsType {
	gym: gt.gymType & {
		climbed_problems: number[];
		problems: gt.problemType[];
	};
}

// feels bad, but works
// integer keys are climbed problems
// "filters" holds filters object matching Filters.StateType
interface StateType {
	[id: number]: boolean;
	filters: any;
}

class Gym extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		const state: StateType = { filters: {} };
		props.gym.problems.forEach((problem: gt.problemType) => {
			state[problem.id] =
				props.gym.climbed_problems.indexOf(problem.id) !== -1;
		});
		this.state = state;
	}

	checkboxProps(id: number) {
		const g_props = g.input(this, id.toString(), gt.InputType.Checkbox);
		const original_on_change = g_props.onChange;
		const onChange: typeof original_on_change = event => {
			const original_state = Object.assign({}, this.state);
			const state_change = original_on_change(event);
			g.req(`/gym/${this.props.gym.path}/problem/${id}/climb`, "POST", {
				climbed: state_change[id]
			})
				.then(g.refresh)
				.catch(err => {
					this.setState(original_state);
					g.err(err);
				});
			return state_change;
		};
		return Object.assign(g_props, { onChange });
	}

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
				<div className={gs.flex}>
					{this.props.gym.problems
						.filter(problem =>
							Filters.shouldDisplayProblem(
								problem,
								this.state.filters
							)
						)
						.map(problem => (
							<div key={problem.id} className={gs.bubble}>
								<Link
									to={`${this.props.gym.path}/problem/${
										problem.id
									}`}
								>
									<h4>{`${problem.name} (${problem.id})`}</h4>
								</Link>
								<p>
									<label>
										<span>{problem.difficulty} </span>
										<input
											{...this.checkboxProps(problem.id)}
										/>
									</label>
								</p>
								<p>{formatDate(problem.date)}</p>
								<p>
									{problem.location}
									{Boolean(problem.active) && (
										<span> (retired)</span>
									)}
								</p>
								<p>
									{problem.color}
									{Boolean(problem.setter) && (
										<span> - set by {problem.setter}</span>
									)}
								</p>
							</div>
						))}
				</div>
			</div>
		);
	}
}

export default Gym;
