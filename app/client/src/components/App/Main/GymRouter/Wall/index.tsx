import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Media from './Media';

import * as gt from '../../../../../globals';

class Wall extends Component<{wall: gt.wallType & {media: gt.mediaType[]}}> {
    render() {
      return (
          <div>
            <Link to={'/'}>Home</Link>
            <div>
                <p>id: {this.props.wall.id}</p>
                <p>name: {this.props.wall.name}</p>
                <p>difficulty: {this.props.wall.difficulty}</p>
                <p>location: {this.props.wall.location}</p>
                <p>date: {this.props.wall.date}</p>
                <p>setter: {this.props.wall.setter}</p>
                <p>color: {this.props.wall.color}</p>
                <p>status: {this.props.wall.active ? 'active' : 'retired'}</p>

                <Media media={this.props.wall.media}/>
            </div>
          </div>
      );
    }
  }

export default Wall;
