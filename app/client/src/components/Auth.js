import React, { Component } from 'react';

class Auth extends Component {
    login(response) {
        if (!this.loggedOut()) return;
        var id_token = response.Zi.id_token;
        fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ id_token }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => this.props.fetch());
    }

    logout() {
        var googlePromise = window.gapi.auth2.getAuthInstance().signOut();
        var fetchPromise = fetch('/api/auth/logout', {method: 'POST'});

        Promise.all([googlePromise, fetchPromise])
            .then((response) => this.props.fetch());
    }

    componentDidMount() {
        var preload = document.getElementById('google-platform-preload');
        var script = document.createElement('script');
        script.src = preload.href;
        document.head.appendChild(script);

        window.onSignIn = this.login.bind(this);
    }

    loggedOut() {
        return this.props.state.user.id === undefined;
    }

    render() {
        return (
        <div>
            <meta name="google-signin-client_id" content={this.props.state.google_signin_client_id}></meta>
            <div hidden={!this.loggedOut()} id="sign-in-button" className="g-signin2" data-onsuccess="onSignIn"></div>

            {this.loggedOut() ? (
                <div></div>
            ) : (
                <div>
                    <p>Logged In</p>
                    <button onClick={this.logout.bind(this)}>Sign out</button><br />
                    <a href="/user/{this.props.state.user.id}">Profile</a><br />
                </div>
            )}
        </div>
        );
    }
  }

export default Auth;
