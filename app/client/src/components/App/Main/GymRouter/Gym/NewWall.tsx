import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import g from '../../../../../globals';
import * as gt from '../../../../../globals';

class EditWall extends Component<object, gt.wallType> {
    render() {
      return (
        <form>
            <p>New Wall</p>
            <p>name: <input {...g.input(this, "namex")} /></p>
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

export default EditWall;
