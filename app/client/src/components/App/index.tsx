import React, { Component } from 'react';
import Auth from './Auth';
import Main from './Main';

import g, * as gt from '../../globals';

class App extends Component<object, Readonly<{common: gt.commonType, gyms: gt.gymType[]}>> {
  constructor(props: {}) {
    super(props);
    g.setApp(this);
  }

  componentDidMount(): void {
    g.refresh();
  }

  render(): any {
    if (!this.state) return null;
    return (
      <div>
        <Auth {...this.state.common}/>
        <Main {...this.state}/>
      </div>
    );
  }
}

export default App;
