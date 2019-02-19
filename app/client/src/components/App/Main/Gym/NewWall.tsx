import React, { Component, FormEvent } from "react";

import g from "../../../../globals";
import * as gt from "../../../../globals";

class NewWall extends Component<{ gym_path: string }, gt.wallType> {
	constructor(props: any) {
		super(props);
		this.state = gt.initial_wall;
	}

	submit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		g.req(`/api/gym/${this.props.gym_path}/new_wall`, "POST", this.state)
			.then(() => this.setState(gt.initial_wall))
			.then(g.refresh);
	};

	render() {
		return (
			<form onSubmit={this.submit}>
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
					date: <input {...g.input(this, "date")} />
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
				<input type="submit" />
			</form>
		);
	}
}

export default NewWall;
