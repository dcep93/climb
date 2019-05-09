import React, { Component } from "react";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import Media from "../Gym/Problem/Media";

import styles from "./index.module.css";

class Profile extends Component<
	{ user: gt.userType; media: gt.mediaType[]; problems: gt.problemType[] },
	gt.userType
> {
	constructor(props: any) {
		super(props);
		this.state = Object.assign({}, props.user);
	}

	checkboxProps(name: string) {
		const original_state = Object.assign({}, this.state);
		const g_props = g.input(this, name, gt.InputType.Checkbox);
		const original_on_change = g_props.onChange;
		const disabled = !g.common().user.is_admin;
		const onChange: typeof original_on_change = event => {
			const url = `/admin/user/${this.props.user.id}/edit`;
			const state_change = original_on_change(event);
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

	static profileDiv(user: gt.userType) {
		return (
			<div>
				<p>
					{user.name} ({user.id})
				</p>
				<p>{user.email}</p>
				<p>{new Date(user.timestamp).toLocaleString()}</p>
				<img className={styles.profile_pic} src={user.image} />
			</div>
		);
	}

	permissionDiv() {
		return (
			<div>
				<p>
					is admin: <input {...this.checkboxProps("is_admin")} />
				</p>
				<p>
					is verified:{" "}
					<input {...this.checkboxProps("is_verified")} />
				</p>
			</div>
		);
	}

	render() {
		return (
			<div>
				<div className={`${gs.bubble} ${styles.profile}`}>
					<g.Title title={this.props.user.name} />
					<div>
						{Profile.profileDiv(this.props.user)}
						{g.common().user.is_admin && this.permissionDiv()}
					</div>
				</div>
				<Media
					media={this.props.media}
					users={[this.props.user]}
					problems={this.props.problems}
					forProfile={true}
				/>
			</div>
		);
	}
}

export default Profile;
