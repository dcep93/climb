import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../globals';
import * as gt from '../../../globals';

class Profile extends Component<gt.userType, gt.userType> {
    constructor(props: any) {
      super(props);
      this.state = {is_admin: props.is_admin, is_verified: props.is_verified};
    }

    checkboxProps(name: string) {
        var originalState = Object.assign({}, this.state);
        var gProps = g.input(this, name, gt.InputType.Checkbox);
        var originalOnChange = gProps.onChange;
        var disabled = !this.state.is_admin;
        var onChange: typeof originalOnChange = (event) => {
            var stateChange = originalOnChange(event);
            g.req(`/api/admin/user/${this.props.id}/edit`, 'POST', stateChange)
                .then((response) => response.json())
                .catch((err) => {
                    this.setState(originalState);
                    g.err(err);
                });
            return stateChange;
        };
        return Object.assign(gProps, {onChange, disabled});
    }

    render() {
      return (
          <div>
            <Link to={'/'}>Home</Link>
            <div>
                <p>{this.props.name}</p>
                <img src={this.props.image} /><br />
                <p>is admin: <input {...this.checkboxProps("is_admin")} /></p>
                <p>is verified: <input {...this.checkboxProps("is_verified")} /></p>
            </div>
          </div>
      );
    }
  }

export default Profile;
