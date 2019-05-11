import React, { Component } from "react";

import Media from "./Media";
import NewMedia from "./NewMedia";

import * as gt from "../../../../../../globals";
import gs from "../../../../../../globals.module.css";

import ProblemShow from "./ProblemShow";
import ProblemEdit from "./ProblemEdit";

interface PropsType {
	problem: gt.problemType & {
		media: gt.mediaType[];
		gym_name: string;
		users: gt.userType[];
	};
}

interface StateType {
	showing: boolean;
}

class Problem extends Component<PropsType, StateType> {
	constructor(props: PropsType) {
		super(props);
		this.state = { showing: true };
	}

	setShow(showing: boolean) {
		this.setState({ showing });
	}

	render() {
		return (
			<div>
				<div className={gs.flex}>
					<div className={`${gs.bubble} ${gs.inline}`}>
						{this.state.showing ? (
							<ProblemShow
								{...this.props}
								setShow={this.setShow.bind(this)}
							/>
						) : (
							<ProblemEdit
								{...this.props}
								setShow={this.setShow.bind(this)}
							/>
						)}
					</div>
					<div>
						<div className={gs.bubble}>
							<NewMedia {...this.props.problem} />
						</div>
					</div>
				</div>

				<Media
					media={this.props.problem.media}
					users={this.props.problem.users}
					problems={[]}
					forProfile={false}
				/>
			</div>
		);
	}
}

export default Problem;
