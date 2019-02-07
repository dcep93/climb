import React, { Component } from 'react';
import Auth from './Auth';
import Main from './Main';

class App extends Component {
  componentDidMount() {
    this.fetch();
  }

  fetch() {
    fetch('/api')
      .then((response) => response.json())
      .then((response) => this.setState(response));
  }

  render() {
    if (!this.state) return null;
    return (
      <div>
        <Auth state={this.state.common} fetch={this.fetch.bind(this)}/>
        <Main state={this.state}/>
      </div>
    );
  }
}

export default App;
