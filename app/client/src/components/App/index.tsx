import React, { Component } from 'react';
import Auth from './Auth';
import Main from './Main';

import g, * as gt from '../../globals';

type State = Readonly<{common: gt.commonType, gyms: gt.gymType[]}>

class App extends Component<object, State> {
  componentDidMount(): void {
    this.refresh();
  }

  refresh = (): void => {
    g.req('/api')
      .then((response) => response.json())
      .then((response) => this.setState(response));
  }

  render(): any {
    if (!this.state) return null;
    return (
      <div>
        <Auth {...this.state.common} refresh={this.refresh}/>
        <Main {...this.state}/>
      </div>
    );
  }
}

export default App;
