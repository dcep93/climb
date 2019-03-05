import React from "react";
import { Link } from "react-router-dom";

import GymsAdmin from "./GymsAdmin";

import g from "../../../globals";
import * as gt from "../../../globals";
import gs from "../../../globals.module.css";

import styles from "./index.module.css";

function Gyms(props: { gyms: gt.gymType[] }) {
	return (
		<div>
			<div className={`${styles.gyms} ${gs.bubble}`}>
				{props.gyms.map(gym => (
					<p key={gym.id} className={gs.bubble}>
						<Link to={`/gym/${gym.path}`}>
							{gym.name} | {gym.description}
						</Link>
					</p>
				))}
			</div>
			{g.common().user.is_admin && <GymsAdmin />}
		</div>
	);
}

export default Gyms;
