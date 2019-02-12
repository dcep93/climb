import React, { Component } from 'react';

import g from '../../../globals';
import * as gt from '../../../globals';

const initialState = {path: "", name: "", description: ""};

class GymsAdmin extends Component<object, Readonly<typeof initialState>> {
    constructor(props: any) {
      super(props);
      this.state = initialState;
    }

    submit = (event: React.FormEvent): void => {
      g.req('/api/admin/new_gym', 'POST', this.state)
        .then(response => response.text())
        .then(console.log);
      event.preventDefault();
    }

    getTextArea = () => {
      // @ts-ignore Type 'HTMLTextAreaElement' is missing the following properties from type 'HTMLInputElement': accept, align, alt, checked, and 23 more.  TS2322
      return <textarea {...g.input(this, "descrption")}/>;
    }

    render(): any {
      return (
        <form onSubmit={this.submit}>
            <p>New Gym</p>
            <p>path: <input {...g.input(this, "path", gt.InputType.Text)}/></p>
            <p>name: <input {...g.input(this, "name", gt.InputType.Text)}/></p>
            <p>description: {this.getTextArea()}</p>
            <input type="submit" />
        </form>
      );
    }
  }

export default GymsAdmin;
