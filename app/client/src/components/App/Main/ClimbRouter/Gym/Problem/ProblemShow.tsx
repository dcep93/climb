import React from "react";

import { Link } from "react-router-dom";

import g, * as gt from "../../../../../../globals";
import Button from "react-bootstrap/Button";

function ProblemShow(props: {
	problem: gt.problemType;
	gym_name: string;
	setShow: (toShow: boolean) => void;
}) {
	return (
		<div>
			<p>
				<Link to={`/gym/${props.problem.gym_path}`}>
					To {props.gym_name}
				</Link>
			</p>
			<p>
				{props.problem.name} ({props.problem.id})
			</p>
			<p>
				<label>
					<span>{props.problem.difficulty} </span>
					<input type={"checkbox"} />
				</label>
			</p>
			<p>{g.formatDate(props.problem.date)}</p>
			<p>
				{props.problem.location}
				{!Boolean(props.problem.active) && <span> (retired)</span>}
			</p>
			<p>
				{props.problem.color}
				{Boolean(props.problem.setter) && (
					<span> - set by {props.problem.setter}</span>
				)}
			</p>
			{g.common().user.is_admin && (
				<Button onClick={() => props.setShow(false)}>Edit</Button>
			)}
		</div>
	);
}

export default ProblemShow;
