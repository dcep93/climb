import React, { Component } from 'react';

class MainAdmin extends Component {
    constructor(props) {
      super(props);
      this.state = {path: "", name: "", description: ""};
    }

    submit = (event) => {
      window.req('/api/admin/new_gym', 'POST', this.state)
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
            <p>path: <input name="path" type="text" value={this.state.path} onChange={this.handleChange}/></p>
            <p>name: <input name="name" type="text" value={this.state.name} onChange={this.handleChange}/></p>
            <p>description: <textarea name="description" value={this.state.description} onChange={this.handleChange} /></p>
            <input type="submit" />
        </form>
      );
    }
  }

export default MainAdmin;
