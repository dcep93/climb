import React, { Component } from "react";

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

	submit = (event: React.MouseEvent<HTMLInputElement>): void => {
		event.preventDefault();
		const url = `/gym/${this.props.gym_path}/problem/${this.props.id}/edit`;
		g.req(url, "POST", this.state).then(g.refresh);
	};

	render() {
		return (
			<div className={gs.bubble}>
				<p>id: {this.props.id}</p>
				<p>
					name: <input {...g.input(this, "name")} />
				</p>
				<p>
					difficulty: <input {...g.input(this, "difficulty")} />
				</p>
				<p>
					location: <input {...g.input(this, "location")} />
				</p>
				<p>
					date: <input {...g.input(this, "date")} type="date" />
				</p>
				<p>
					setter: <input {...g.input(this, "setter")} />
				</p>
				<p>
					color: <input {...g.input(this, "color")} />
				</p>
				<p>
					active:{" "}
					<input
						{...g.input(this, "active", gt.InputType.Checkbox)}
					/>
				</p>
				<input type="submit" onClick={this.submit} />
			</div>
		);
	}
}

export default EditProblem;
