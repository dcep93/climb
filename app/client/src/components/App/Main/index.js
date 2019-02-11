import React, { Component } from 'react';

import MainAdmin from './MainAdmin';

class Main extends Component {
    render() {
      return (
        <div>
          <div>The Climbing App</div>
          {this.props.state.gyms.map((gym, index) => 
            <p key={gym.id}><a href={`/gym/${gym.path}`}>{gym.name} | {gym.description}</a></p>
          )}
          {this.props.state.common.user.is_admin && <MainAdmin />}
        </div>
      );
    }
  }

export default Main;
