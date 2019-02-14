import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Gym from './Gym';
import GymEdit from './Gym/GymEdit';
import Wall from './Wall';

class GymRouter extends Component<any> {
    render() {
      return (
        <Switch>
            // @ts-ignore TS2739
            <Route exact path='/gym/:gym_id' render={() => <Gym {...this.props}/>}/>
            // @ts-ignore TS2739
            <Route exact path='/gym/:gym_id/edit' render={() => <GymEdit {...this.props}/>}/>
            // @ts-ignore TS2739
            <Route path='/gym/:gym_id/wall/:wall_id' render={() => <Wall {...this.props}/>}/>
        </Switch>
      );
    }
  }
export default GymRouter;
