import React from "react";
import { Link } from "react-router-dom";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import profile from "../Profile";

function LatestUsers(props: { users: gt.userType[] }) {
	return (
		<div>
			<g.Title title="Latest Users" />
			<div className={gs.flex}>
				{props.users.map(user => (
					<div key={user.id} className={gs.bubble}>
						<Link to={`/user/${user.id}`}>
							{profile.profileDiv(user)}
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default LatestUsers;
