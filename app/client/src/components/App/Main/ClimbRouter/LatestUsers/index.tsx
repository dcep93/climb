import React from "react";
import { Link } from "react-router-dom";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./index.module.css";

function LatestUsers(props: { users: gt.userType[] }) {
	return (
		<div>
			<g.Title title="Latest Users" />
			<div className={gs.flex}>
				{props.users.map(user => (
					<div key={user.id} className={gs.bubble}>
						<Link to={`/user/${user.id}`}>
							<p>
								{user.name} ({user.id})
							</p>
							<p>{user.email}</p>
							<p>{new Date(user.timestamp).toLocaleString()}</p>
							<img
								className={styles.profile_pic}
								src={user.image}
							/>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export default LatestUsers;
