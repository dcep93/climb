import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import Main from "./Main";

import g, * as gt from "../../globals";

class App extends Component<RouteComponentProps, { ready: boolean } & any> {
	constructor(props: RouteComponentProps) {
		super(props);

		this.state = { ready: false };

		g.setApp(this);

		this.props.history.listen(g.refresh);
	}

	componentDidMount(): void {
		g.refresh();
	}

	_refresh = (_unready: any): Promise<any> => {
		const unready = _unready === g.unready_o;
		console.log("refresh", unready, this.props.history.location.pathname);
		// todo fix to actually unready
		// if (unready) this.setState({ ready: false });
		if (unready) location.reload();
		return g
			.req(`${this.props.history.location.pathname}`)
			.then(response => response.json())
			.then(response => {
				this.setState(Object.assign({ ready: true }, response));
				return response;
			});
	};

	_common = (): gt.commonType => {
		return this.state.common;
	};

	render(): any {
		if (!this.state.ready) return null;
		return <Main {...this.state as any} />;
	}
}

export default withRouter(App);
