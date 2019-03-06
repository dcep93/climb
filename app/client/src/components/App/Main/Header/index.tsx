import React from "react";
import { Link } from "react-router-dom";

import Auth from "./Auth";

import g from "../../../../globals";
import gs from "../../../../globals.module.css";

import styles from "./Header.module.css";

function Header() {
	return (
		<div className={`${styles.header} ${gs.bubble}`}>
			<Link to={"/"}>Home</Link>
			{g.common().user.is_admin && (
				<Link to={"/admin/user/latest"}>Latest Users</Link>
			)}
			<Auth />
		</div>
	);
}

export default Header;
