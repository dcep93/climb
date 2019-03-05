import React from "react";
import { Link } from "react-router-dom";

import * as gt from "../../../globals";

function LatestUsers(props: { users: gt.userType[] }) {
	return (
		<div>
			{props.users.map(user => (
				<div key={user.id}>
					<p>id: {user.id}</p>
					<p>name: {user.name}</p>
					<p>email: {user.email}</p>
					<p>timestamp: {user.timestamp}</p>
					<p>
						<Link to={`/user/${user.id}`}>Profile</Link>
					</p>
				</div>
			))}
		</div>
	);
}

export default LatestUsers;
