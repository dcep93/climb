import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as gt from '../../../globals';

class LatestUsers extends Component<{users: gt.userType[]}> {
    render() {
      return (
          <div>
            <Link to={'/'}>Home</Link>
            <div>
                {this.props.users.map((user) =>
                    <div key={user.id}>
                        <p>id: {user.id}</p>
                        <p>name: {user.name}</p>
                        <p>timestamp: {user.timestamp}</p>
                        <p><Link to={`/user/${user.id}`}>Profile</Link></p>
                    </div>
                )}
            </div>
          </div>
      );
    }
  }

export default LatestUsers;
