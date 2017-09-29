import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

class Sidebar extends Component {
  render() {
    const location = this.props.location.slice(1);
    return (
      <nav className="col-sm-4 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <Link className={`nav-link ${location === 'spins' ? 'active' : ''}`} to="/spins">Spins</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location === 'components' ? 'active' : ''}`} to="/components">Components</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location === 'reels' ? 'active' : ''}`} to="/reels">Reels</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location === 'recipes' ? 'active' : ''}`} to="/recipes">Recipes</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location === 'weightings' ? 'active' : ''}`} to="/weightings">Weightings</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;