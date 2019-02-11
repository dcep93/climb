import React, { Component } from 'react';

import MainAdmin from './MainAdmin';

import * as gt from '../../../globals';

class Main extends Component<{gyms: gt.gymType[], common: gt.commonType}> {
    render() {
      return (
        <div>
          <div>The Climbing App</div>
          {this.props.gyms.map((gym) => 
            <p key={gym.id}><a href={`/gym/${gym.path}`}>{gym.name} | {gym.description}</a></p>
          )}
          {this.props.common.user.is_admin && <MainAdmin />}
        </div>
      );
    }
  }

export default Main;
