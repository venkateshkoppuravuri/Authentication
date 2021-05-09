import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import routes from "./routes";

class ClientRoute extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map((route, k) => (
            <Route key={`route_${k}`} {...route}/>
          ))}
        </Switch>
      </Router>
    );
  }
}

export default ClientRoute;
