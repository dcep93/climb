import React, { Component } from "react";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./index.module.css";

const initial_gym: gt.gymType = { id: 0, name: "", path: "", description: "" };
class GymsAdmin extends Component<object, gt.gymType> {
	constructor(props: any) {
		super(props);
		this.state = initial_gym;
	}

	submit = (event: React.MouseEvent<HTMLInputElement>) => {
		g.req("/admin/new_gym", "POST", this.state)
			.then(() => this.setState(initial_gym))
			.then(g.refresh);
		event.preventDefault();
	};

	render() {
		return (
			<div className={`${gs.bubble} ${styles.new_gym}`}>
				<h3>New Gym</h3>
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
				<input type="submit" onClick={this.submit} />
			</div>
		);
	}
}

export default GymsAdmin;
