import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import g, * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

interface PropsType extends gt.problemType {
	gym_path: string;
}

class GymEditProblem extends Component<PropsType, gt.problemType> {
	constructor(props: PropsType) {
		super(props);
		this.state = Object.assign({}, props, {
			date: g.inputDate(props.date)
		});
	}

	submit = (): void => {
		const url = `/gym/${this.props.gym_path}/problem/${this.props.id}/edit`;
		g.req(url, "POST", this.state).then(g.refresh);
	};

	render() {
		return (
			<div className={gs.bubble}>
				<div>id: {this.props.id}</div>
				<div className={gs.flex}>
					<div className={gs.padding}>
						<div>name</div>
						<input {...g.input(this, "name")} size={7} />
					</div>
					<div className={gs.padding}>
						<div>difficulty</div>
						<input {...g.input(this, "difficulty")} size={4} />
					</div>
					<div className={gs.padding}>
						<div>location</div>
						<input {...g.input(this, "location")} size={5} />
					</div>
					<div className={gs.padding}>
						<div>color</div>
						<input {...g.input(this, "color")} size={5} />
					</div>
					<div className={gs.padding}>
						<div>setter</div>
						<input {...g.input(this, "setter")} size={5} />
					</div>
					<div className={gs.padding}>
						<div>date</div>
						<input {...g.dateInput(this, "date")} />
					</div>
					<div className={gs.padding}>
						<label>
							<div>active</div>
							<input
								{...g.input(
									this,
									"active",
									gt.InputType.Checkbox
								)}
							/>
						</label>
					</div>
					<div className={`${gs.align_center} ${gs.margin}`}>
						<Button onClick={this.submit}>Submit</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default GymEditProblem;
