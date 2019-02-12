import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../globals';

declare global {
    interface Window {
        onSignIn(_: any): void;
        gapi: any;
    }
}

interface Props {
    refresh(): void,
    user: any,
    google_signin_client_id: string,
}

class Auth extends Component<Props> {
    constructor(props: any) {
        super(props);

        var preload = document.getElementById('google-platform-preload') as HTMLLinkElement;
        var script = document.createElement('script');
        script.src = preload.href;
        document.head.appendChild(script);

        window.onSignIn = this.login;
    }

    login = (response: any): void => {
        if (this.loggedIn()) return;
        var id_token = response.Zi.id_token;
        g.req('/api/auth/login', 'POST', { id_token })
            .then(this.props.refresh);
    }

    logout = (): void => {
        var googlePromise = window.gapi.auth2.getAuthInstance().signOut();
        var reqPromise = g.req('/api/auth/logout', 'POST');

        Promise.all([googlePromise, reqPromise])
            .then(this.props.refresh);
    }

    loggedIn(): boolean {
        return this.props.user.id !== undefined;
    }

    render(): any {
        return (
        <div>
            <meta name="google-signin-client_id" content={this.props.google_signin_client_id}></meta>
            <div hidden={this.loggedIn()} id="sign-in-button" className="g-signin2" data-onsuccess="onSignIn"></div>

            {this.loggedIn() && (
                <div>
                    <button onClick={this.logout}>Sign out</button><br />
                    <Link to={`/user/${this.props.user.id}`}>Profile</Link>
                </div>
            )}
        </div>
        );
    }
  }

export default Auth;
