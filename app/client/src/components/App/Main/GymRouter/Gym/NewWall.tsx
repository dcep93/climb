import React, { Component, FormEvent } from 'react';

import g from '../../../../../globals';
import * as gt from '../../../../../globals';

var initialState = {id: 0, name: "", difficulty: "", location: "", date: "", setter: "", color: "", active: false};
class NewWall extends Component<object, gt.wallType> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    submit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        var gymPath = 'dogpatch_boulders'; // TODO
        g.req(`/api/gym/${gymPath}/new_wall`, 'POST', this.state)
            .then(() => this.setState(initialState))
            .then(g.refresh);
    }

    render() {
      return (
        <form onSubmit={this.submit}>
            <p>New Wall</p>
            <p>name: <input {...g.input(this, "name")} /></p>
            <p>difficulty: <input {...g.input(this, "difficulty")} /></p>
            <p>location: <input {...g.input(this, "location")} /></p>
            <p>date: <input {...g.input(this, "date")} /></p>
            <p>setter: <input {...g.input(this, "setter")} /></p>
            <p>color: <input {...g.input(this, "color")} /></p>
            <p>active: <input {...g.input(this, "active", gt.InputType.Checkbox)} /></p>
            <input type="submit" />
        </form>
      );
    }
  }

export default NewWall;
