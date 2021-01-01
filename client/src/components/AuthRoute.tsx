import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../AuthUser.context";

interface Props {
  component: any;
  [rest: string]: any;
}

const AuthRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
