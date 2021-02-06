import React from "react";
import { Redirect, Route, Switch } from "react-router";

import AuthRoute from "./AuthRoute";
import {
  Home,
  Login,
  NewPost,
  Register,
  SinglePost,
  SingleUser,
} from "../pages";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact strict path="/" component={Home} />
      <Route exact path="/user/:username" component={SingleUser} />
      <Route exact path="/post/:username/:postId" component={SinglePost} />
      <AuthRoute exact path="/post/new" isPrivate component={NewPost} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      {/* No Match path */}
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
