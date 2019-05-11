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
				<p>New Problem</p>
				<div className={styles.new_problem}>
					<div>
						name
						<br />
						<input {...g.input(this, "name")} size={11} />
					</div>
					<div>
						difficulty
						<br />
						<input {...g.input(this, "difficulty")} size={5} />
					</div>
					<br />
					<div>
						location
						<br />
						<input {...g.input(this, "location")} size={10} />
					</div>
					<div>
						color
						<br />
						<input {...g.input(this, "color")} size={7} />
					</div>
					<div>
						setter
						<br />
						<input {...g.input(this, "setter")} size={8} />
					</div>
					<div>
						date
						<br />
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