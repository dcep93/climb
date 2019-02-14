import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GymsAdmin from './GymsAdmin';

import * as gt from '../../../globals';

class Gyms extends Component<{gyms: gt.gymType[], common: gt.commonType}> {
    render() {
      return (
        <div>
          <div>The Climbing App</div>
          {this.props.gyms.map((gym) => 
            <p key={gym.id}><Link to={`/gym/${gym.path}`}>{gym.name} | {gym.description}</Link></p>
          )}
          {this.props.common.user.is_admin && <GymsAdmin />}
        </div>
      );
    }
  }

export default Gyms;
