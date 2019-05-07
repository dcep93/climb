import React, { Component } from "react";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./Filters.module.css";

interface PropsType {
	updateFilter: any;
}

interface StateType {
	name: string;
	difficulty: string;
	location: string;
	date: string;
	active?: boolean;
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
			active: true,
			color: "",
			setter: ""
		};
	}

	static shouldDisplayProblem(
		problem: gt.problemType,
		filters: StateType
	): boolean {
		if (filters === null) return true;
		if (
			Boolean(filters.name) &&
			problem.name.toLowerCase().indexOf(filters.name.toLowerCase()) ===
				-1
		) {
			return false;
		}
		return true;
	}

	input(name: string): any {
		const g_props = g.input(this, name);
		const original_on_change = g_props.onChange;
		const onChange: typeof original_on_change = event => {
			const state_change = original_on_change(event);
			this.props.updateFilter(state_change);
			return state_change;
		};
		return Object.assign(g_props, { onChange });
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
						<input {...this.input("name")} size={7} />
					</div>
					<div>
						<p>Difficulty</p>
						<input {...this.input("difficulty")} size={4} />
					</div>
					<div>
						<p>Location</p>
						<input {...this.input("location")} size={7} />
					</div>
					<div>
						<p>Date</p>
						<input {...this.input("date")} size={8} />
					</div>
					<div>
						<p>Active</p>
						<input {...this.input("active")} size={8} />
					</div>
					<div>
						<p>Color</p>
						<input {...this.input("color")} size={6} />
					</div>
					<div>
						<p>Setter</p>
						<input {...this.input("setter")} size={6} />
					</div>
				</div>
			</div>
		);
	}
}

export default Filters;
