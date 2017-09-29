import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

class App extends Component {
  render() {
    const { route, location } = this.props;
    return (
      <div id="content-wrapper">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar location={location.pathname} />
            {renderRoutes(route.routes)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
