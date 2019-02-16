import React, { Component, ReactNode } from 'react';
import { Switch, Route, RouteComponentProps, StaticContext } from 'react-router';

import Auth from './Auth';

import Gyms from './Gyms';
import Profile from './Profile';
import LatestUsers from './LatestUsers';
import Gym from './Gym';
import GymEdit from './Gym/GymEdit';
import Wall from './Wall';

import g from '../../../globals';

function props(path: string, render: (match?: RouteComponentProps<any, StaticContext, any>) => ReactNode) {
  return {
    exact: true,
    path,
    render: (match: RouteComponentProps<any, StaticContext, any>) =>
      g.common().path === match.location.pathname && render(match)
  }
}

class Main extends Component<any> {
    render() {
      return (
        <div>
          <Auth />
          <Switch>
            <Route {...props('/', () => <Gyms gyms={this.props.gyms}/>)}/>
            <Route {...props('/admin/user/latest', () => <LatestUsers users={this.props.users}/>)}/>
            <Route {...props('/user/:user_id', () => <Profile user={this.props.user}/>)}/>
            <Route {...props('/gym/:gym_path', () => <Gym gym={this.props.gym}/>)}/>
            <Route {...props('/gym/:gym_path/edit', () => <GymEdit gym={this.props.gym}/>)}/>
            <Route {...props('/gym/:gym_path/wall/:wall_id', () => <Wall wall={this.props.wall}/>)}/>
          </Switch>
        </div>
      );
    }
  }

export default Main;
