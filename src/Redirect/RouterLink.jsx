import React, {Component} from 'react';
import Home from "../Pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default  class RouterLink extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path="/Home" element={<Home />} />
          </Switch>
        </Router>
    );
  }
}