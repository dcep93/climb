import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import g from "../../../../../globals";
import gs from "../../../../../globals.module.css";

import styles from "./index.module.css";

declare global {
	interface Window {
		onSignIn(_: any): void;
		gapi: any;
	}
}

function login(response: any): void {
	if (loggedIn()) return;
	const id_token = response.Zi.id_token;
	g.req("/auth/login", "POST", { id_token }).then(g.unready);
}

function logout(): void {
	const google_promise = window.gapi.auth2.getAuthInstance().signOut();
	const req_promise = g.req("/auth/logout", "POST");

	Promise.all([google_promise, req_promise]).then(g.unready);
}

function loggedIn(): boolean {
	return g.common().user.id !== undefined;
}

function Auth() {
	if (window.onSignIn === undefined) {
		const preload = document.getElementById(
			"google-platform-preload"
		) as HTMLLinkElement;
		const script = document.createElement("script");
		script.src = preload.href;
		document.head.appendChild(script);

		window.onSignIn = login;
	}

	return (
		<div className={styles.align_end}>
			<meta
				name="google-signin-client_id"
				content={g.common().google_signin_client_id}
			/>
			<div
				hidden={loggedIn()}
				id="sign-in-button"
				className={`g-signin2 ${styles.g_sign_in}`}
				data-onsuccess="onSignIn"
			/>

			{loggedIn() && (
				<div>
					<Button onClick={logout} variant="primary">
						Sign out
					</Button>
					<Link
						to={`/user/${g.common().user.id}`}
						className={gs.margin}
					>
						Profile
					</Link>
				</div>
			)}
		</div>
	);
}

export default Auth;
