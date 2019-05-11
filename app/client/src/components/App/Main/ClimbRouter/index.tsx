import React, { ReactNode } from "react";
import {
	Switch,
	Route,
	RouteComponentProps,
	StaticContext
} from "react-router";

import Gym from "./Gym";
import Problem from "./Problem";
import GymEdit from "./GymEdit";
import Gyms from "./Gyms";
import LatestUsers from "./LatestUsers";
import Profile from "./Profile";

import g from "../../../../globals";

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

function ClimbRouter(props: any) {
	return (
		<div>
			<Switch>
				<Route {...p("/", () => <Gyms gyms={props.gyms} />)} />
				<Route
					{...p("/admin/user/latest", () => (
						<LatestUsers users={props.users} />
					))}
				/>
				<Route
					{...p("/user/:user_id", () => (
						<Profile
							user={props.user}
							media={props.media}
							problems={props.problems}
						/>
					))}
				/>
				<Route
					{...p("/gym/:gym_path", () => (
						<Gym
							gym={props.gym}
							climbed_problems={props.climbed_problems}
							problems={props.problems}
							pictures={props.pictures}
						/>
					))}
				/>
				<Route
					{...p("/gym/:gym_path/edit", () => (
						<GymEdit gym={props.gym} problems={props.problems} />
					))}
				/>
				<Route
					{...p("/gym/:gym_path/problem/:problem_id", () => (
						<Problem
							problem={props.problem}
							gym_name={props.gym_name}
							media={props.media}
							users={props.users}
						/>
					))}
				/>
			</Switch>
		</div>
	);
}

export default ClimbRouter;
