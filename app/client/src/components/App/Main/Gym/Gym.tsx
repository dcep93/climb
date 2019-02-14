import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../../globals';
import * as gt from '../../../../globals';

class Gym extends Component<{climbedWalls: number[], gym: gt.gymType, walls: gt.wallType[], common: gt.commonType}, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    checkboxProps(id: number) {
        var originalState = Object.assign({}, this.state);
        var gProps = g.input(this, id.toString(), gt.InputType.Checkbox);
        var originalOnChange = gProps.onChange;
        var checked = this.props.climbedWalls.indexOf(id) !== -1;
        var onChange: typeof originalOnChange = (event) => {
            event.preventDefault();
            var stateChange = originalOnChange(event);
            g.req(`/api/${this.props.common.path}/wall/${id}/climb`, 'POST', {climbed: stateChange[id]})
                .catch((err) => {
                    this.setState(originalState);
                    g.err(err);
                });
            return stateChange;
        };
        return Object.assign(gProps, {onChange, checked});
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
