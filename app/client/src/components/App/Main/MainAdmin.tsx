import React, { Component } from 'react';

import g from '../../../globals';

const initialState = {path: "", name: "", description: ""};
type State = Readonly<typeof initialState>

class MainAdmin extends Component<object, State> {
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

    render(): any {
      return (
        <form onSubmit={this.submit}>
            <p>New Gym</p>
            <p>path: <input type="text" {...g.input(this, "path")}/></p>
            <p>name: <input type="text" {...g.input(this, "name")}/></p>
            <p>description: <textarea {...g.input(this, "descrption")}/></p>
            <input type="submit" />
        </form>
      );
    }
  }

export default MainAdmin;
