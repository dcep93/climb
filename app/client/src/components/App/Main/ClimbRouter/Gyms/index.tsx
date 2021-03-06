import React from "react";
import { Link } from "react-router-dom";

import GymsAdmin from "./GymsAdmin";

import g, * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./index.module.css";

function Gyms(props: { gyms: gt.gymType[] }) {
	return (
		<div>
			<g.Title title="The Climbing App" />
			<div className={`${gs.flex} ${styles.gyms_parent}`}>
				<div>
					{props.gyms.map(gym => (
						<div
							key={gym.id}
							className={`${gs.bubble} ${styles.gym}`}
						>
							<Link to={`/gym/${gym.path}`}>
								<h3>{gym.name}</h3>
								<div>{gym.description}</div>
							</Link>
						</div>
					))}
				</div>
				{g.common().user.is_admin && <GymsAdmin />}
			</div>
		</div>
	);
}

export default Gyms;
