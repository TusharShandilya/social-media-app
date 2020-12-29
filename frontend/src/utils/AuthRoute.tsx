import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../context/AuthUser.context";

interface Props {
  component: React.FC | React.ClassicComponentClass;
  [rest: string]: any;
}

const AuthRoute: React.FC<Props> = ({ component: Component, rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      render={(props) => (user ? <Redirect to="/" /> : <Component {...rest} />)}
    />
  );
};

export default AuthRoute;
