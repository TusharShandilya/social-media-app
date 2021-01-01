import React from "react";
import { Route } from "react-router";

import AuthRoute from "../utils/AuthRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </React.Fragment>
  );
};

export default Routes;
