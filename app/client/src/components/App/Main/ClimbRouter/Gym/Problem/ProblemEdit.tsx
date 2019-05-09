import React, { Component } from "react";

import { Link } from "react-router-dom";

import g from "../../../../../../globals";
import * as gt from "../../../../../../globals";

import Button from "react-bootstrap/Button";

interface PropsType {
	problem: gt.problemType & {
		media: gt.mediaType[];
		gym_name: string;
		users: gt.userType[];
	};
	setShow(showing: boolean): void;
}

class ProblemEdit extends Component<PropsType, gt.problemType> {
	constructor(props: PropsType) {
		super(props);
		this.state = Object.assign({}, props.problem, {
			date: g.inputDate(props.problem.date)
		});
	}

	submit = (): void => {
		const url = `/gym/${this.props.problem.gym_path}/problem/${
			this.props.problem.id
		}/edit`;
		g.req(url, "POST", this.state)
			.then(g.refresh)
			.then(() => this.props.setShow(true));
	};

	render() {
		return (
			<div>
				<p>
					<Link to={`/gym/${this.props.problem.gym_path}`}>
						To {this.props.problem.gym_name}
					</Link>
				</p>
				<p>
					<input {...g.input(this, "name")} size={10} />
					<span> id: ({this.props.problem.id})</span>
				</p>
				<p>
					<input {...g.input(this, "difficulty")} size={5} />
				</p>
				<p>
					<input {...g.dateInput(this, "date")} />
				</p>
				<p>
					<input {...g.input(this, "location")} size={8} />
					<label>
						<span> active </span>
						<input
							{...g.input(this, "active", gt.InputType.Checkbox)}
						/>
					</label>
				</p>
				<p>
					<input {...g.input(this, "color")} size={5} />
					<span> set by </span>
					<input {...g.input(this, "setter")} size={6} />
				</p>
				<Button onClick={this.submit.bind(this)}>Submit</Button>
				<span> </span>
				<Button onClick={() => this.props.setShow(true)}>Cancel</Button>
			</div>
		);
	}
}

export default ProblemEdit;
