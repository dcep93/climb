import React, { Component } from 'react';

class Auth extends Component {
    constructor(props) {
        super(props);

        var preload = document.getElementById('google-platform-preload');
        var script = document.createElement('script');
        script.src = preload.href;
        document.head.appendChild(script);

        window.onSignIn = this.login;
    }

    login = (response) => {
        if (this.loggedIn()) return;
        var id_token = response.Zi.id_token;
        this.dReq('/api/auth/login', 'POST', { id_token })
            .then(this.props.refresh);
    }

    logout = () => {
        var googlePromise = window.gapi.auth2.getAuthInstance().signOut();
        var reqPromise = this.dReq('/api/auth/logout', 'POST');

        Promise.all([googlePromise, reqPromise])
            .then(this.props.refresh);
    }

    loggedIn() {
        return this.props.user.id !== undefined;
    }

    render() {
        return (
        <div>
            <meta name="google-signin-client_id" content={this.props.google_signin_client_id}></meta>
            <div hidden={this.loggedIn()} id="sign-in-button" className="g-signin2" data-onsuccess="onSignIn"></div>

            {this.loggedIn() && (
                <div>
                    <button onClick={this.logout}>Sign out</button><br />
                    <a href={`/user/${this.props.user.id}`}>Profile</a><br />
                </div>
            )}
        </div>
        );
    }
  }

export default Auth;
