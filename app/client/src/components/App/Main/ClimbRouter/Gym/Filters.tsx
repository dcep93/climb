import React, { Component } from "react";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./Filters.module.css";

interface PropsType {
	updateFilter: any;
	problemsBank: gt.problemType[];
}

interface StateType {
	name: string;
	difficulty: string;
	location: string;
	date: string;
	active: string;
	color: string;
	setter: string;
}

enum SelectType {
	difficulty = "difficulty",
	location = "location",
	color = "color",
	setter = "setter"
}

class Filters extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			name: "",
			difficulty: "",
			location: "",
			date: "",
			active: "",
			color: "",
			setter: ""
		};
	}

	static shouldDisplayProblem(
		problem: gt.problemType,
		filters: any,
		climbed_problems: number[]
	): boolean {
		if (filters === null) return true;
		if (
			filters.name !== undefined &&
			problem.name.toLowerCase().indexOf(filters.name.toLowerCase()) ===
				-1
		)
			return false;
		if (
			Boolean(filters.climbed) &&
			(filters.climbed === "true") ===
				(climbed_problems.indexOf(problem.id) === -1)
		)
			return false;
		if (Filters.shouldFilterSelect(SelectType.difficulty, problem, filters))
			return false;
		if (Filters.shouldFilterSelect(SelectType.location, problem, filters))
			return false;
		if (
			Boolean(filters.active) &&
			Boolean(problem.active) !== (filters.active === "true")
		)
			return false;
		if (Filters.shouldFilterSelect(SelectType.color, problem, filters))
			return false;
		if (Filters.shouldFilterSelect(SelectType.setter, problem, filters))
			return false;
		return true;
	}

	static shouldFilterSelect(
		field: SelectType,
		problem: gt.problemType,
		filters: StateType
	): boolean {
		return (
			filters[field] !== undefined &&
			filters[field] !== "" &&
			filters[field] !== problem[field]
		);
	}

	inputProperties(name: string): any {
		const g_props = g.input(this, name);
		const original_on_change = g_props.onChange;
		const onChange: typeof original_on_change = event => {
			const state_change = original_on_change(event);
			this.props.updateFilter(state_change);
			return state_change;
		};
		return Object.assign(g_props, { onChange });
	}

	selectAction(event: React.ChangeEvent<HTMLSelectElement>) {
		this.props.updateFilter({ [event.target.name]: event.target.value });
	}

	getSelectOptions(field: SelectType): any[] {
		return this.props.problemsBank
			.map(problem => problem[field] as string)
			.sort();
	}

	selectComponent(field: SelectType) {
		return (
			<select name={field} onChange={this.selectAction.bind(this)}>
				<option value={""}>All</option>
				{this.getSelectOptions(field).map(value => (
					<option key={value}>{value}</option>
				))}
			</select>
		);
	}

	render() {
		return (
			// todo minimizeable
			// todo url state https://dev.to/gaels/an-alternative-to-handle-global-state-in-react-the-url--3753
			<div className={gs.bubble}>
				<h4>Filters</h4>
				<div className={`${styles.filters} ${gs.flex}`}>
					<div>
						<p>Name</p>
						<input {...this.inputProperties("name")} size={7} />
					</div>
					<div>
						<p>Climbed</p>
						<select
							name={"climbed"}
							onChange={this.selectAction.bind(this)}
						>
							<option value={""}>All</option>
							<option value={"true"}>yes</option>
							<option value={"false"}>no</option>
						</select>
					</div>
					<div>
						<p>Difficulty</p>
						{this.selectComponent(SelectType.difficulty)}
					</div>
					<div>
						<p>Location</p>
						{this.selectComponent(SelectType.location)}
					</div>
					<div>
						<p>Status</p>
						<select
							name={"active"}
							onChange={this.selectAction.bind(this)}
						>
							<option value={""}>All</option>
							<option value={"true"}>Active</option>
							<option value={"false"}>Retired</option>
						</select>
					</div>
					<div>
						<p>Color</p>
						{this.selectComponent(SelectType.color)}
					</div>
					<div>
						<p>Setter</p>
						{this.selectComponent(SelectType.setter)}
					</div>
				</div>
			</div>
		);
	}
}

export default Filters;
