import React, { Component, FormEvent } from "react";

import g from "../../../../globals";
import * as gt from "../../../../globals";

class EditWall extends Component<
	gt.wallType & { gym_path: string },
	gt.wallType
> {
	constructor(props: any) {
		super(props);
		this.state = Object.assign({}, props);
	}

	submit = (event: React.MouseEvent<HTMLInputElement>): void => {
		event.preventDefault();
		g.req(
			`/api/gym/${this.props.gym_path}/wall/${this.props.id}/edit`,
			"POST",
			this.state
		).then(g.refresh);
	};

	render() {
		return (
			<div>
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
				<input type="submit" onClick={this.submit} />
			</div>
		);
	}
}

export default EditWall;
