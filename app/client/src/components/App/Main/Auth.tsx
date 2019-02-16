import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../globals';

declare global {
    interface Window {
        onSignIn(_: any): void;
        gapi: any;
    }
}

class Auth extends Component {
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
            .then(g.refresh);
    }

    logout = (): void => {
        var googlePromise = window.gapi.auth2.getAuthInstance().signOut();
        var reqPromise = g.req('/api/auth/logout', 'POST');

        Promise.all([googlePromise, reqPromise])
            .then(g.refresh);
    }

    loggedIn(): boolean {
        return g.common().user.id !== undefined;
    }

    render(): any {
        return (
        <div>
            <meta name="google-signin-client_id" content={g.common().google_signin_client_id}></meta>
            <div hidden={this.loggedIn()} id="sign-in-button" className="g-signin2" data-onsuccess="onSignIn"></div>

            {this.loggedIn() && (
                <div>
                    <button onClick={this.logout}>Sign out</button><br />
                    <Link to={`/user/${g.common().user.id}`}>Profile</Link>
                </div>
            )}
            {g.common().user.is_admin && (
                <Link to={'/admin/user/latest'}>Latest Users</Link>
            )}
        </div>
        );
    }
  }

export default Auth;
