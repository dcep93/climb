import React, { Component } from "react";
import { Link } from "react-router-dom";

import g from "../../../../globals";
import * as gt from "../../../../globals";

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
			event.preventDefault();
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
				<div>{this.props.gym.name}</div>
				<div>{this.props.gym.description}</div>
				<br />
				<div>
					<p>Walls</p>
					<br />
					{g.common().user.is_verified && (
						<Link to={`${g.common().path}/edit`}>Edit</Link>
					)}
					{this.props.gym.walls.map(wall => (
						<div key={wall.id}>
							<Link to={`${g.common().path}/wall/${wall.id}`}>
								<p>id: {wall.id}</p>
								<p>name: {wall.name}</p>
								<p>difficulty: {wall.difficulty}</p>
								<p>location: {wall.location}</p>
								<p>date: {wall.date}</p>
								<p>setter: {wall.setter}</p>
								<p>color: {wall.color}</p>
								<p>
									status: {wall.active ? "active" : "retired"}
								</p>
							</Link>
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
