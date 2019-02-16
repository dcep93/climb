import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Gym from './Gym';
import GymEdit from './Gym/GymEdit';
import Wall from './Wall';

class GymRouter extends Component<{gym: any, wall: any}> {
    render() {
      return (
        <Switch>
            <Route exact path='/gym/:gym_id' render={() => <Gym gym={this.props.gym}/>}/>
            <Route exact path='/gym/:gym_id/edit' render={() => <GymEdit gym={this.props.gym}/>}/>
            <Route path='/gym/:gym_id/wall/:wall_id' render={() => <Wall wall={this.props.wall}/>}/>
        </Switch>
      );
    }
  }
export default GymRouter;
