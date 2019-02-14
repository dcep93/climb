import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Gyms from './Gyms';
import Profile from './Profile';
import GymRouter from './GymRouter';
import LatestUsers from './LatestUsers';

class Main extends Component<any> {
    render() {
      return (
        <Switch>
          // @ts-ignore TS2739
          <Route exact path='/' {...this.props} render={() => <Gyms {...this.props}/>}/>
          <Route path='/user/:user_id' render={() => <Profile {...this.props.user}/>}/>
          // @ts-ignore TS2739
          <Route path='/gym/:gym_id' render={() => <GymRouter {...this.props}/>}/>
          // @ts-ignore TS2739
          <Route path='/admin/user/latest' render={() => <LatestUsers {...this.props}/>}/>
        </Switch>
      );
    }
  }

export default Main;
