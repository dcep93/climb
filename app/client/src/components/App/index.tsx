import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Main from './Main';

import g, * as gt from '../../globals';

class App extends Component<RouteComponentProps, {ready: boolean} & any> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {ready: false};

    g.setApp(this);

    this.props.history.listen(() => {
      this.setState({ready: false});
      g.refresh();
    });
  }

  componentDidMount(): void {
    g.refresh();
  }

  _refresh = (): void => {
    console.log('refresh', this.props.history.location.pathname);
    g.req(`/api${this.props.history.location.pathname}`)
      .then((response) => response.json())
      .then((response) => this.setState(Object.assign({ready: true}, response)));
  }

  _common = (): gt.commonType => {
    return this.state.common;
  }

  render(): any {
    if (!this.state.ready) return null;
    return (
      <Main {...this.state as any}/>
    );
  }
}

export default withRouter(App);
