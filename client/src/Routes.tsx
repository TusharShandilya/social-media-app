import React from "react";
import { Route } from "react-router";

import AuthRoute from "./components/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SingleUser from "./pages/SingleUser";
import SinglePost from "./pages/SinglePost";

const Routes: React.FC = () => {
  return (
    <React.Fragment>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/:username" component={SingleUser} />
      <Route exact path="/post/:username/:postId" component={SinglePost} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
    </React.Fragment>
  );
};

export default Routes;
