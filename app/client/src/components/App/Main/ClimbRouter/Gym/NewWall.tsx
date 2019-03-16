import React, { Component } from "react";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

const initial_wall: gt.wallType = {
	id: 0,
	name: "",
	difficulty: "",
	location: "",
	date: "",
	setter: "",
	color: "",
	active: true
};
class NewWall extends Component<{ gym_path: string }, gt.wallType> {
	constructor(props: any) {
		super(props);
		this.state = Object.assign({}, initial_wall, { date: g.inputDate() });
	}

	submit = (event: React.MouseEvent<HTMLInputElement>): void => {
		event.preventDefault();
		g.req(`/gym/${this.props.gym_path}/new_wall`, "POST", this.state)
			.then(() => this.setState(initial_wall))
			.then(g.refresh);
	};

	render() {
		return (
			<div className={gs.bubble}>
				<p>New Wall</p>
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

export default NewWall;
