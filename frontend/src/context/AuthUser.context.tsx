import { createContext, useReducer } from "react";

type AuthContextType = {
  user: object | null;
  login: (userData: object) => void;
  logout: () => void;
};

const initialState: AuthContextType = {
  user: null,
  login: (userData: object) => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);
// TODO: Change state type
const authReducer = (
  state: any,
  action: { type: string; payload?: object }
) => {
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

  const login = (userData: object) => {
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
