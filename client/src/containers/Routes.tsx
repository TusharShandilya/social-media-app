import React from "react";
import { Redirect, Route } from "react-router";

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
    <React.Fragment>
      <Route exact strict path="/" component={Home} />
      <Route exact path="/user/:username" component={SingleUser} />
      <Route exact path="/post/:username/:postId" component={SinglePost} />
      <AuthRoute exact path="/post/new" isPrivate component={NewPost} />
      <AuthRoute exact path="/login" component={Login} />
      <AuthRoute exact path="/register" component={Register} />
      {/* No Match path */}
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </React.Fragment>
  );
};

export default Routes;
