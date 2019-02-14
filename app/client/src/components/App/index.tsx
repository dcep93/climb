import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Auth from './Auth';
import Main from './Main';

import g, * as gt from '../../globals';

class App extends Component<RouteComponentProps, Readonly<{ready: boolean, common: gt.commonType, gyms: gt.gymType[]}>> {
  constructor(props: any) {
    super(props);

    g.setRefresh(this.refreshApi);

    this.props.history.listen(g.refresh);
  }

  componentDidMount(): void {
    g.refresh();
  }

  refreshApi = (): void => {
    console.log('refresh', this.props.history.location.pathname);
    this.setState({ready: false});
    g.req(`/api${this.props.history.location.pathname}`)
      .then((response) => response.json())
      .then((response) => this.setState(Object.assign({ready: true}, response)));
  }

  render(): any {
    if (!this.state || !this.state.ready) return null;
    return (
      <div>
        <Auth {...this.state.common}/>
        <Main {...this.state}/>
      </div>
    );
  }
}

export default withRouter(App);
