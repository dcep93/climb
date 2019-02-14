import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NewWall from './NewWall';
import EditWall from './EditWall';

import g from '../../../../../globals';
import * as gt from '../../../../../globals';

class GymEdit extends Component<{climbedWalls: number[], gym: gt.gymType, walls: gt.wallType[], common: gt.commonType}, any> {
    constructor(props: any) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    getTextArea = () => {
      // @ts-ignore Type 'HTMLTextAreaElement' is missing the following properties from type 'HTMLInputElement': accept, align, alt, checked, and 23 more.  TS2322
      return <textarea {...g.input(this, "descrption")}/>;
    }

    render() {
      return (
          <div>
            <Link to={'/'}>Home</Link>
            <form>
                <p>name: <input {...g.input(this, "name")} /></p>
                <p>description: {this.getTextArea()}</p>
                <input type="submit" />
            </form>
            <div>
                <p>Walls</p>
                <br />
                <NewWall />
                {this.props.walls.map((wall) =>
                    <EditWall key={wall.id} {...wall} />
                )}
            </div>
          </div>
      );
    }
  }

export default GymEdit;
