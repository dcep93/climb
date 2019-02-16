import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Auth from './Auth';

import Gyms from './Gyms';
import Profile from './Profile';
import GymRouter from './GymRouter';
import LatestUsers from './LatestUsers';


class Main extends Component<{gyms: any, user: any, gym: any, users: any}> {
    render() {
      return (
        <div>
          <Auth />
          <Switch>
            <Route exact path='/' render={() => <Gyms gyms={this.props.gyms}/>}/>
            <Route path='/user/:user_id' render={() => <Profile user={this.props.user}/>}/>
            <Route path='/gym/:gym_id' render={() => <GymRouter {...this.props as any}/>}/>
            <Route path='/admin/user/latest' render={() => <LatestUsers users={this.props.users}/>}/>
          </Switch>
        </div>
      );
    }
  }

export default Main;
