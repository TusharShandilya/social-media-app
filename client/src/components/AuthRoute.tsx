import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../AuthUser.context";

interface Props {
  component: any;
  isPrivate?: boolean;
  [rest: string]: any;
}

const AuthRoute: React.FC<Props> = ({
  component: Component,
  isPrivate,
  ...rest
}) => {
  const { user } = useContext(AuthContext);

  let redirectFlag = false;
  if (isPrivate) {
    if (!user) {
      // The route is private and the user is not signed in
      redirectFlag = true;
    }
  } else {
    if (user) {
      // The route is protected and the user is signed in
      redirectFlag = true;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        redirectFlag ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
