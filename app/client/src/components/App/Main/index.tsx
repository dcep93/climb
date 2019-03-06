import React from "react";

import Header from "./Header";
import ClimbRouter from "./ClimbRouter";

function Main(props: any) {
	return (
		<div>
			<Header />
			<ClimbRouter {...props} />
		</div>
	);
}

export default Main;
