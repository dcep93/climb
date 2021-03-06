import React, { Component } from "react";

import MediaForProblem from "../Media/MediaForProblem";
import NewMedia from "../Media/NewMedia";

import * as gt from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import ProblemShow from "./ProblemShow";
import ProblemEdit from "./ProblemEdit";

interface PropsType {
	problem: gt.problemType;
	media: gt.mediaType[];
	users: gt.userType[];
	gym_name: string;
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
							<NewMedia
								problem={this.props.problem}
								gym_name={this.props.gym_name}
							/>
						</div>
					</div>
				</div>

				<MediaForProblem
					media={this.props.media}
					users={this.props.users}
				/>
			</div>
		);
	}
}

export default Problem;
