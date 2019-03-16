import React, { Component } from "react";
import { Link } from "react-router-dom";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./index.module.css";

function formatDate(dateString: string): string {
	return new Date(dateString).toDateString();
}

interface PropsType {
	gym: gt.gymType & { climbed_walls: number[]; walls: gt.wallType[] };
}
interface StateType {
	[id: number]: boolean;
}
class Gym extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		const state: StateType = {};
		props.gym.walls.forEach((wall: gt.wallType) => {
			state[wall.id] = props.gym.climbed_walls.indexOf(wall.id) !== -1;
		});
		this.state = state;
	}

	checkboxProps(id: number) {
		const g_props = g.input(this, id.toString(), gt.InputType.Checkbox);
		const original_on_change = g_props.onChange;
		const onChange: typeof original_on_change = event => {
			const original_state = Object.assign({}, this.state);
			const state_change = original_on_change(event);
			g.req(`/${g.common().path}/wall/${id}/climb`, "POST", {
				climbed: state_change[id]
			})
				.then(g.refresh)
				.catch(err => {
					this.setState(original_state);
					g.err(err);
				});
			return state_change;
		};
		return Object.assign(g_props, { onChange });
	}

	render() {
		return (
			<div>
				<g.Title title={this.props.gym.name} />
				<div className={styles.gym_header}>
					<h2>{this.props.gym.name}</h2>
					<div>{this.props.gym.description}</div>
					{g.common().user.is_verified && (
						<Link to={`${g.common().path}/edit`}>Edit</Link>
					)}
				</div>
				<div className={gs.flex}>
					{this.props.gym.walls.map(wall => (
						<div key={wall.id} className={gs.bubble}>
							<Link to={`${g.common().path}/wall/${wall.id}`}>
								<h4>{`${wall.name} (${wall.id})`}</h4>
							</Link>
							<p>difficulty: {wall.difficulty}</p>
							<p>location: {wall.location}</p>
							<p>date: {formatDate(wall.date)}</p>
							<p>setter: {wall.setter}</p>
							<p>color: {wall.color}</p>
							<p>status: {wall.active ? "active" : "retired"}</p>
							<p>
								climbed:{" "}
								<input {...this.checkboxProps(wall.id)} />
							</p>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Gym;
