import { createContext, useReducer } from "react";

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

const initialState: State = {
  user: null,
  login: (userData: User) => {},
  logout: () => {},
};

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
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
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
