import React, { Component } from "react";
import { Link } from "react-router-dom";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

interface PropsType {
	gym: gt.gymType & {
		climbed_problems: number[];
		problems: gt.problemType[];
	};
	shouldDisplayProblem(problem: gt.problemType): boolean;
}

interface StateType {
	[id: number]: boolean;
}

function formatDate(dateString: string): string {
	return new Date(dateString).toDateString();
}

class GymProblems extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		const state: StateType = {};
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

	renderProblem(problem: gt.problemType) {
		return (
			<div key={problem.id} className={`${gs.bubble} ${gs.flex}`}>
				<div>
					<Link to={`${this.props.gym.path}/problem/${problem.id}`}>
						<h4>{`${problem.name} (${problem.id})`}</h4>
					</Link>
					<p>
						<label>
							<span>{problem.difficulty} </span>
							<input {...this.checkboxProps(problem.id)} />
						</label>
					</p>
					<p>{formatDate(problem.date)}</p>
					<p>
						{problem.location}
						{Boolean(problem.active) && <span> (retired)</span>}
					</p>
					<p>
						{problem.color}
						{Boolean(problem.setter) && (
							<span> - set by {problem.setter}</span>
						)}
					</p>
				</div>
				{Boolean(problem.picture) && <img src={problem.picture} />}
			</div>
		);
	}

	render() {
		const problems = this.props.gym.problems.filter(
			this.props.shouldDisplayProblem
		);
		if (problems.length > 0) {
			return (
				<div className={gs.flex}>
					{problems.map(this.renderProblem.bind(this))}
				</div>
			);
		} else {
			return (
				<div className={gs.text_align}>
					<div className={`${gs.bubble} ${gs.inline}`}>
						No problems match your filter
					</div>
				</div>
			);
		}
	}
}

export default GymProblems;
