import React from "react";
import { Link } from "react-router-dom";

import * as gt from "../../../globals";
import gs from "../../../globals.module.css";

import styles from "./LatestUsers.module.css";

function LatestUsers(props: { users: gt.userType[] }) {
	return (
		<div className={styles.users}>
			{props.users.map(user => (
				<div key={user.id} className={gs.bubble}>
					<Link to={`/user/${user.id}`}>
						<p>id: {user.id}</p>
						<p>name: {user.name}</p>
						<p>email: {user.email}</p>
						<p>timestamp: {user.timestamp}</p>
						<img src={user.image} />
					</Link>
				</div>
			))}
		</div>
	);
}

export default LatestUsers;
