import React, { Component } from "react";

import g from "../../../globals";
import * as gt from "../../../globals";

class GymsAdmin extends Component<object, gt.gymType> {
	constructor(props: any) {
		super(props);
		this.state = gt.initial_gym;
	}

	submit = (event: React.FormEvent) => {
		g.req("/api/admin/new_gym", "POST", this.state)
			.then(() => this.setState(gt.initial_gym))
			.then(g.refresh);
		event.preventDefault();
	};

	render() {
		return (
			<form onSubmit={this.submit}>
				<p>New Gym</p>
				<p>
					path:{" "}
					<input {...g.input(this, "path", gt.InputType.Text)} />
				</p>
				<p>
					name:{" "}
					<input {...g.input(this, "name", gt.InputType.Text)} />
				</p>
				<p>
					description: <textarea {...g.input(this, "description")} />
				</p>
				<input type="submit" />
			</form>
		);
	}
}

export default GymsAdmin;
