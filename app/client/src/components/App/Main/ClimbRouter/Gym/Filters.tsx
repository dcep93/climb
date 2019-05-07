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
		filters: any
	): boolean {
		if (filters === null) return true;
		if (
			filters.name !== undefined &&
			problem.name.toLowerCase().indexOf(filters.name.toLowerCase()) ===
				-1
		)
			return false;
		if (Filters.shouldFilterSelect("difficulty", problem, filters))
			return false;
		if (Filters.shouldFilterSelect("location", problem, filters))
			return false;
		if (
			Boolean(filters.active) &&
			problem.active != (filters.active === "true")
		)
			return false;
		if (Filters.shouldFilterSelect("color", problem, filters)) return false;
		return true;
	}

	static shouldFilterSelect(
		field: string,
		problem: gt.problemType,
		filters: StateType
	): boolean {
		return (
			// @ts-ignore Type error: Element implicitly has an 'any' type because type 'StateType' has no index signature.
			filters[field] !== undefined &&
			// @ts-ignore Type error: Element implicitly has an 'any' type because type 'StateType' has no index signature.
			filters[field] !== "" &&
			// @ts-ignore Type error: Element implicitly has an 'any' type because type 'StateType' has no index signature.
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

	getSelectOptions(field: string): any[] {
		return this.props.problemsBank
			.map(
				// @ts-ignore Type error: Element implicitly has an 'any' type because type 'problemType' has no index signature.
				problem => problem[field] as string
			)
			.sort();
	}

	selectComponent(field: string) {
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
			// todo climbed
			// todo url state https://dev.to/gaels/an-alternative-to-handle-global-state-in-react-the-url--3753
			<div className={gs.bubble}>
				<h4>Filters</h4>
				<div className={`${styles.filters} ${gs.flex}`}>
					<div>
						<p>Name</p>
						<input {...this.inputProperties("name")} size={7} />
					</div>
					<div>
						<p>Difficulty</p>
						{this.selectComponent("difficulty")}
					</div>
					<div>
						<p>Location</p>
						{this.selectComponent("location")}
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
						{this.selectComponent("color")}
					</div>
					<div>
						<p>Setter</p>
						{this.selectComponent("setter")}
					</div>
				</div>
			</div>
		);
	}
}

export default Filters;
