import React, { Component } from "react";

window.addEventListener("unhandledrejection", function(event) {
	if (event.reason instanceof ReqError) event.preventDefault();
});

interface userType {
	id: number;
	is_admin: boolean;
	is_verified: boolean;
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

interface wallType {
	id: number;
	name: string;
	difficulty: string;
	location: string;
	date: string;
	setter: string;
	active: boolean;
	color: string;
}

const initial_wall: wallType = {
	id: 0,
	name: "",
	difficulty: "",
	location: "",
	date: "",
	setter: "",
	color: "",
	active: false
};

const initial_gym: gymType = { id: 0, name: "", path: "", description: "" };

interface mediaType {
	id: number;
	wall_id: number;
	gcs_path: string;
	user_id: number;
	fils_size: number;
	mime: string;
	data: string;
	width: number;
	height: number;
}

class ReqError extends Error {}

function req(url: string, method?: string, body?: any): Promise<Response> {
	return fetch(url, {
		method,
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => {
			if (response.status >= 400) throw new ReqError(response.statusText);
			return response;
		})
		.catch(err => {
			return Promise.reject(new ReqError(err));
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
	var field = type === undefined ? "value" : input_type_to_field[type];
	return {
		name,
		type: type,
		[field]: c.state[name],
		onChange: (
			event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
		) => {
			var t: any = event.target;
			var state = { [event.target.name]: t[field] };
			c.setState(state);
			return state;
		}
	};
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

var unready_o = Object();

function unready() {
	refresh(unready_o);
}

export default { req, input, err, refresh, common, setApp, unready, unready_o };

// @ts-ignore Type error: Cannot re-export a type when the '--isolatedModules' flag is provided.  TS1205
// prettier-ignore
export { commonType, userType, gymType, initial_gym, wallType, initial_wall, mediaType, InputType };
