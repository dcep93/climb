import React, { Component } from "react";

import g, * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import MediaForProfile from "../Gym/Problem/MediaForProfile";

import styles from "./index.module.css";

interface PropsType {
	user: gt.userType;
	media: gt.mediaType[];
	problems: gt.problemType[];
}

interface StateType {
	is_admin: boolean;
	is_verified: boolean;
}

class Profile extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		this.state = {
			is_verified: props.user.is_verified,
			is_admin: props.user.is_admin
		};
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
					console.error(err);
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
				<MediaForProfile
					media={this.props.media}
					problems={this.props.problems}
				/>
			</div>
		);
	}
}

export default Profile;
