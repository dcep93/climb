import React, { Component } from 'react';

class MainAdmin extends Component {
    constructor(props) {
      super(props);
      this.state = {path: "", name: "", description: ""};
    }

    submit = (event) => {
      this.dReq('/api/admin/new_gym', 'POST', this.state)
        .then(response => response.text())
        .then(console.log);
      event.preventDefault();
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value});
    }

    render() {
      return (
        <form onSubmit={this.submit}>
            <p>New Gym</p>
            <p>path: <input type="text" {...this.dInput(this, "path")}/></p>
            <p>name: <input type="text" {...this.dInput(this, "name")}/></p>
            <p>description: <textarea {...this.dInput(this, "descrption")}/></p>
            <input type="submit" />
        </form>
      );
    }
  }

export default MainAdmin;
