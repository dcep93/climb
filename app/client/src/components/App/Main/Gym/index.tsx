import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../../globals';
import * as gt from '../../../../globals';

interface PropsType {gym: gt.gymType & {climbedWalls: number[], walls: gt.wallType[]}};
interface StateType {[id: number]: boolean};
class Gym extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        var state: StateType = {};
        props.gym.walls.forEach((wall: gt.wallType) => {
            state[wall.id] = props.gym.climbedWalls.indexOf(wall.id) !== -1;
        });
        this.state = state;
    }

    checkboxProps(id: number) {
        var g_props = g.input(this, id.toString(), gt.InputType.Checkbox);
        var original_on_change = g_props.onChange;
        var onChange: typeof original_on_change = (event) => {
            event.preventDefault();
            var original_state = Object.assign({}, this.state);
            var state_change = original_on_change(event);
            g.req(`/api/${g.common().path}/wall/${id}/climb`, 'POST', {climbed: state_change[id]})
                .catch((err) => {
                    this.setState(original_state);
                    g.err(err);
                });
            return state_change;
        };
        return Object.assign(g_props, {onChange});
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
                {g.common().user.is_verified && <Link to={`${g.common().path}/edit`}>Edit</Link>}
                {this.props.gym.walls.map((wall) =>
                    <Link key={wall.id} to={`${g.common().path}/wall/${wall.id}`}>
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
