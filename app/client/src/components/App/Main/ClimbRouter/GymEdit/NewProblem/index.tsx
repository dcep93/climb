import React, { Component } from "react";

import g, * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

import styles from "./index.module.css";
import Button from "react-bootstrap/Button";

const initial_problem: gt.problemType = {
	id: 0,
	name: "",
	difficulty: "",
	location: "",
	date: "",
	setter: "",
	color: "",
	active: true,
	gym_path: ""
};

interface PropsType {
	gym_path: string;
}

class NewProblem extends Component<PropsType, gt.problemType> {
	constructor(props: PropsType) {
		super(props);
		this.state = Object.assign({}, initial_problem, {
			date: g.inputDate()
		});
	}

	submit = (): void => {
		g.req(`/gym/${this.props.gym_path}/new_problem`, "POST", this.state)
			.then(() => this.setState(initial_problem))
			.then(g.refresh);
	};

	render() {
		return (
			<div
				className={`${gs.bubble} ${gs.inline} ${
					styles.new_problem_container
				}`}
			>
				<h5>New Problem</h5>
				<div className={styles.new_problem}>
					<div>
						<div>name</div>
						<input {...g.input(this, "name")} size={11} />
					</div>
					<div>
						<div>difficulty</div>
						<input {...g.input(this, "difficulty")} size={5} />
					</div>
					<div>
						<div>location</div>
						<input {...g.input(this, "location")} size={10} />
					</div>
					<div>
						<div>color</div>
						<input {...g.input(this, "color")} size={7} />
					</div>
					<div>
						<div>setter</div>
						<input {...g.input(this, "setter")} size={8} />
					</div>
					<div>
						<div>date</div>
						<input {...g.dateInput(this, "date")} />
					</div>
				</div>
				<div className={gs.vertical_space_20} />
				<Button onClick={this.submit}>Submit</Button>
			</div>
		);
	}
}

export default NewProblem;
