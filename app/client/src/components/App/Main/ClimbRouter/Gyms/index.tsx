import React from "react";
import { Link } from "react-router-dom";

import GymsAdmin from "./GymsAdmin";

import g from "../../../../../globals";
import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

function Gyms(props: { gyms: gt.gymType[] }) {
	return (
		<div>
			<g.Title title="The Climbing App" />
			<div className={gs.flex}>
				{props.gyms.map(gym => (
					<div key={gym.id} className={gs.bubble}>
						<Link to={`/gym/${gym.path}`}>
							<h3>{gym.name}</h3>
							<p>{gym.description}</p>
						</Link>
					</div>
				))}
			</div>
			{g.common().user.is_admin && <GymsAdmin />}
		</div>
	);
}

export default Gyms;
