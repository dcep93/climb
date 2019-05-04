import React from "react";

import Header from "./Header";
import ClimbRouter from "./ClimbRouter";

import gs from "../../../globals.module.css";

function Main(props: any) {
	return (
		<div className={gs.main}>
			<Header />
			<ClimbRouter {...props} />
		</div>
	);
}

export default Main;
