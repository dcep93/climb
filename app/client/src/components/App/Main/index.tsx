import React, { Component, ReactNode } from "react";
import {
	Switch,
	Route,
	RouteComponentProps,
	StaticContext
} from "react-router";

import Auth from "./Auth";

import Gyms from "./Gyms";
import Profile from "./Profile";
import LatestUsers from "./LatestUsers";
import Gym from "./Gym";
import GymEdit from "./Gym/GymEdit";
import Wall from "./Wall";

import g from "../../../globals";

function p(
	path: string,
	render: (params: { [param: string]: string }) => ReactNode
) {
	return {
		exact: true,
		path,
		render: (r_props: RouteComponentProps<any, StaticContext, any>) =>
			g.common().path === encodeURI(r_props.location.pathname) &&
			render(r_props.match.params)
	};
}

function Main(props: any) {
	return (
		<div>
			<Auth />
			<Switch>
				<Route {...p("/", () => <Gyms gyms={props.gyms} />)} />
				<Route
					{...p("/admin/user/latest", () => (
						<LatestUsers users={props.users} />
					))}
				/>
				<Route
					{...p("/user/:user_id", () => (
						<Profile user={props.user} />
					))}
				/>
				<Route
					{...p("/gym/:gym_path", () => <Gym gym={props.gym} />)}
				/>
				<Route
					{...p("/gym/:gym_path/edit", () => (
						<GymEdit gym={props.gym} />
					))}
				/>
				<Route
					{...p("/gym/:gym_path/wall/:wall_id", () => (
						<Wall wall={props.wall} />
					))}
				/>
			</Switch>
		</div>
	);
}

export default Main;
