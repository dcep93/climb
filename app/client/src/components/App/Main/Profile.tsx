import React, { Component } from "react";
import { Link } from "react-router-dom";

import g from "../../../globals";
import * as gt from "../../../globals";

class Profile extends Component<{ user: gt.userType }, gt.userType> {
	constructor(props: any) {
		super(props);
		this.state = Object.assign({}, props.user);
	}

	checkboxProps(name: string) {
		var original_state = Object.assign({}, this.state);
		var g_props = g.input(this, name, gt.InputType.Checkbox);
		var original_on_change = g_props.onChange;
		var disabled = !g.common().user.is_admin;
		var onChange: typeof original_on_change = event => {
			var url = `/admin/user/${this.props.user.id}/edit`;
			var state_change = original_on_change(event);
			g.req(url, "POST", state_change)
				.then(g.unready)
				.catch(err => {
					this.setState(original_state);
					g.err(err);
				});
			return state_change;
		};
		return Object.assign(g_props, { onChange, disabled });
	}

	render() {
		return (
			<div>
				<Link to={"/"}>Home</Link>
				<div>
					<p>{this.props.user.name}</p>
					<img src={this.props.user.image} />
					<br />
					<p>
						is admin: <input {...this.checkboxProps("is_admin")} />
					</p>
					<p>
						is verified:{" "}
						<input {...this.checkboxProps("is_verified")} />
					</p>
				</div>
			</div>
		);
	}
}

export default Profile;
