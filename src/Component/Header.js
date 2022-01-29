import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="Navigate">
          <ul className="PointNav">
            <li></li>
            <li>
              <Link>Логин</Link>
            </li>
            <li>
              <Link>Выход</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;