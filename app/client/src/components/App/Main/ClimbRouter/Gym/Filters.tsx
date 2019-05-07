import React, { Component } from "react";

import g from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./Filters.module.css";

interface StateType {
	name: string;
	difficulty: string;
	location: string;
	date: string;
	active?: boolean;
	color: string;
	setter: string;
}

class Filters extends Component<object, StateType> {
	constructor(props: {}) {
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
						<input {...g.input(this, "name")} size={7} />
					</div>
					<div>
						<p>Difficulty</p>
						<input {...g.input(this, "difficulty")} size={4} />
					</div>
					<div>
						<p>Location</p>
						<input {...g.input(this, "location")} size={7} />
					</div>
					<div>
						<p>Date</p>
						<input {...g.input(this, "date")} size={8} />
					</div>
					<div>
						<p>Active</p>
						<input {...g.input(this, "active")} size={8} />
					</div>
					<div>
						<p>Color</p>
						<input {...g.input(this, "color")} size={6} />
					</div>
					<div>
						<p>Setter</p>
						<input {...g.input(this, "setter")} size={6} />
					</div>
				</div>
			</div>
		);
	}
}

export default Filters;
