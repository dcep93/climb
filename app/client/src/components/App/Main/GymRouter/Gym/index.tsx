import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../../../globals';
import * as gt from '../../../../../globals';

class Gym extends Component<{climbedWalls: number[], gym: gt.gymType, walls: gt.wallType[], common: gt.commonType}, any> {
    constructor(props: any) {
        super(props);
        var state: {[id: number]: boolean} = {};
        props.walls.forEach((wall: gt.wallType) => {
            state[wall.id] = props.climbedWalls.indexOf(wall) !== -1;
        });
        this.state = state;
    }

    checkboxProps(id: number) {
        var gProps = g.input(this, id.toString(), gt.InputType.Checkbox);
        var originalOnChange = gProps.onChange;
        var onChange: typeof originalOnChange = (event) => {
            event.preventDefault();
            var originalState = Object.assign({}, this.state);
            var stateChange = originalOnChange(event);
            g.req(`/api/${this.props.common.path}/wall/${id}/climb`, 'POST', {climbed: stateChange[id]})
                .catch((err) => {
                    this.setState(originalState);
                    g.err(err);
                });
            return stateChange;
        };
        return Object.assign(gProps, {onChange});
    }

    render() {
      return (
          <div>
            <Link to={'/'}>Home</Link>
            <div>{this.props.gym.name}</div>
            <div>{this.props.gym.description}</div>
            <br />
            <div>
                <p>Walls</p>
                <br />
                {this.props.common.user.is_verified && <Link to={`${this.props.common.path}/edit`}>Edit</Link>}
                {this.props.walls.map((wall) => 
                    <Link key={wall.id} to={`${this.props.common.path}/wall/${wall.id}`}>
                        <p>id: {wall.id}</p>
                        <p>name: {wall.name}</p>
                        <p>difficulty: {wall.difficulty}</p>
                        <p>location: {wall.location}</p>
                        <p>date: {wall.date}</p>
                        <p>setter: {wall.setter}</p>
                        <p>color: {wall.color}</p>
                        <p>status: {wall.active ? 'active' : 'retired'}</p>
                        <p>climbed: <input {...this.checkboxProps(wall.id)} /></p>
                    </Link>
                )}
            </div>
          </div>
      );
    }
  }

export default Gym;
