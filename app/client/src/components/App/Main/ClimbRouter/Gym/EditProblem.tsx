import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

class EditProblem extends Component<
	gt.problemType & { gym_path: string },
	gt.problemType
> {
	constructor(props: any) {
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
				<div>
					<label>
						<span>id: {this.props.id} - active </span>
						<input
							{...g.input(this, "active", gt.InputType.Checkbox)}
						/>
					</label>
				</div>
				<div className={gs.flex}>
					<div className={gs.padding}>
						name
						<br />
						<input {...g.input(this, "name")} size={10} />
					</div>
					<div className={gs.padding}>
						difficulty
						<br />
						<input {...g.input(this, "difficulty")} size={4} />
					</div>
					<div className={gs.padding}>
						location
						<br />
						<input {...g.input(this, "location")} size={9} />
					</div>
					<div className={gs.padding}>
						color
						<br />
						<input {...g.input(this, "color")} size={6} />
					</div>
					<div className={gs.padding}>
						setter
						<br />
						<input {...g.input(this, "setter")} size={7} />
					</div>
					<div className={gs.padding}>
						date
						<br />
						<input
							{...g.input(this, "date")}
							type="date"
							min="2019-01-01"
							max="2030-12-31"
						/>
					</div>
					<div>
						<Button onClick={this.submit}>Submit</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default EditProblem;
