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
			.then(g.refresh);
	};

	render() {
		return (
			<div className={`${gs.bubble} ${gs.margin} ${styles.new_gym}`}>
				<h3>New Gym</h3>
				<div>
					<div>path</div>
					<input {...g.input(this, "path", gt.InputType.Text)} />
				</div>
				<div>
					<div>name</div>
					<input {...g.input(this, "name", gt.InputType.Text)} />
				</div>
				<div>
					<div>description</div>
					<textarea {...g.input(this, "description")} />
				</div>
				<Button onClick={this.submit} variant="primary">
					Submit
				</Button>
			</div>
		);
	}
}

export default GymsAdmin;
