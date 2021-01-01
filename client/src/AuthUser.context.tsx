import jwtDecode from "jwt-decode";
import { createContext, useReducer } from "react";
import { getCookie, setCookie } from "./utils/cookies";

type User = {
  [props: string]: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type State = {
  user: object | null;
  login: (userData: User) => void;
  logout: () => void;
};

type Actions = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

type jwtToken = {
  [rest: string]: string;
  exp: string;
  iat: string;
};

const initialState: State = {
  user: null,
  login: (userData: User) => {},
  logout: () => {},
};

let token = getCookie("jwttoken");

if (token !== "") {
  let decodedToken: jwtToken = jwtDecode(token);
  if (Number(decodedToken.exp) * 1000 < Date.now()) {
    setCookie("jwttoken", "", 0);
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<State>(initialState);

const authReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: User) => {
    setCookie("jwttoken", userData.token, 24);
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    setCookie("jwttoken", "", 0);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
