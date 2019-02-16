import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NewWall from './NewWall';
import EditWall from './EditWall';

import g from '../../../../globals';
import * as gt from '../../../../globals';

interface PropsType {gym: gt.gymType & {walls: gt.wallType[]}};
class GymEdit extends Component<PropsType, gt.gymType> {
    constructor(props: PropsType) {
        super(props);
        this.state = Object.assign({}, props.gym);
    }

    render() {
      return (
          <div>
            <Link to={'/'}>Home</Link>
            <form>
                <p>name: <input {...g.input(this, "name")} /></p>
                <p>description: <textarea {...g.input(this, "description")}/></p>
                <input type="submit" />
            </form>
            <div>
                <p>Walls</p>
                <br />
                <NewWall />
                {this.props.gym.walls.map((wall) =>
                    <EditWall key={wall.id} {...wall} />
                )}
            </div>
          </div>
      );
    }
  }

export default GymEdit;
