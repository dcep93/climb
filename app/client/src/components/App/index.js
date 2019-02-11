import React, { Component } from 'react';
import Auth from './Auth';
import Main from './Main';

class App extends Component {
  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.dReq('/api')
      .then((response) => response.json())
      .then((response) => this.setState(response));
  }

  render() {
    if (!this.state) return null;
    return (
      <div>
        <Auth {...this.state.common} refresh={this.refresh}/>
        <Main state={this.state}/>
      </div>
    );
  }
}

export default App;
