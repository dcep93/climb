import React, { Component } from "react";

interface userType {
	id: number;
	is_admin: boolean;
	is_verified: boolean;
	email: string;
	name: string;
	image: string;
	timestamp: number;
}

interface commonType {
	path: string;
	google_signin_client_id: string;
	user: userType;
}

interface gymType {
	id: number;
	path: string;
	name: string;
	description: string;
}

interface problemType {
	id: number;
	name: string;
	difficulty: string;
	location: string;
	date: string;
	setter: string;
	active: boolean;
	color: string;
	gym_path: string;
	picture?: string;
}

interface mediaType {
	id: number;
	problem_id: number;
	gcs_path: string;
	user_id: number;
	file_size: number;
	mime: string;
	data: string;
	width: number;
	height: number;
	picture: string;
}

function req(url: string, method?: string, body?: any): Promise<Response> {
	return fetch(`/api${url}`, {
		method,
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json"
		}
	}).then(response => {
		if (response.status >= 400) {
			throw response;
		} else {
			return response;
		}
	}) as Promise<Response>;
}

enum InputType {
	Text = "text",
	Checkbox = "checkbox"
}

const input_type_to_field = {
	[InputType.Text]: "value",
	[InputType.Checkbox]: "checked"
};

const input = (
	c: Component<object, Readonly<any>>,
	name: string,
	type?: InputType
) => {
	if (c.state[name] === undefined)
		throw new Error(`bad name - ${name} - ${JSON.stringify(c.state)}`);
	const field = type === undefined ? "value" : input_type_to_field[type];
	return {
		name,
		type: type,
		[field]: c.state[name],
		onChange: (
			event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
		) => {
			const t: any = event.target;
			const state = { [event.target.name]: t[field] };
			c.setState(state);
			return state;
		}
	};
};

const dateInput = (c: Component<object, Readonly<any>>, name: string) => {
	const params = input(c, name);
	return Object.assign(params, {
		type: "date",
		min: "2019-01-01",
		max: "2030-12-31"
	});
};

const err = console.error;

var app: { _refresh(_: any): void; _common(): commonType };

function setApp(_app: typeof app) {
	app = _app;
}

function refresh(_?: any) {
	return app._refresh(_);
}

function common() {
	return app._common();
}

const unready_o = Object();

function unready() {
	refresh(unready_o);
}

function inputDate(dateString?: string) {
	const date = dateString === undefined ? new Date() : new Date(dateString);
	return date.toISOString().slice(0, 10);
}

function formatDate(dateString: string): string {
	return new Date(dateString).toDateString();
}

class Title extends Component<{ title: string }> {
	componentDidMount = () => {
		document.title = this.props.title;
	};

	render = () => null;
}

export default {
	req,
	input,
	err,
	refresh,
	common,
	setApp,
	unready,
	unready_o,
	inputDate,
	Title,
	formatDate,
	dateInput
};

// @ts-ignore Type error: Cannot re-export a type when the '--isolatedModules' flag is provided.  TS1205
// prettier-ignore
export { commonType, userType, gymType, problemType, mediaType, InputType };
