import React, { Component } from "react";
import Button from "react-bootstrap/Button";

import g, * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

import styles from "./index.module.css";

const initial_gym: gt.gymType = { id: 0, name: "", path: "", description: "" };
class GymsAdmin extends Component<object, gt.gymType> {
	constructor(props: object) {
		super(props);
		this.state = initial_gym;
	}

	submit = () => {
		g.req("/admin/new_gym", "POST", this.state)
			.then(() => this.setState(initial_gym))
			.then(g.refresh)
			.catch(response => response.text())
			.then(err => alert(err.split("\n")[0]));
	};

	render() {
		return (
			<div className={`${gs.bubble} ${gs.margin} ${styles.new_gym}`}>
				<h3>New Gym</h3>
				<p>
					<div>path</div>
					<input {...g.input(this, "path", gt.InputType.Text)} />
				</p>
				<p>
					<div>name</div>
					<input {...g.input(this, "name", gt.InputType.Text)} />
				</p>
				<p>
					<div>description</div>
					<textarea {...g.input(this, "description")} />
				</p>
				<Button onClick={this.submit} variant="primary">
					Submit
				</Button>
			</div>
		);
	}
}

export default GymsAdmin;
