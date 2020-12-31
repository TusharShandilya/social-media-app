import React from "react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../../context/AuthUser.context";
import useForm from "../../hooks/useForm";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const context = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState<LoginFormValues>({
    username: "",
    password: "",
  });
  const { values, onSubmit, onChange } = useForm<LoginFormValues>(
    {
      username: "",
      password: "",
    },
    handleLogin
  );

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
    },
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        setErrors(graphQLErrors[0].extensions!.exception.errors);
      }
    },
    variables: values,
  });

  function handleLogin() {
    loginUser();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-control">
        <label className="form-control__label" htmlFor="login-username">
          Username
        </label>
        <input
          onChange={onChange}
          value={values.username}
          className="form-control__input"
          type="text"
          name="username"
          id="login-username"
        />
        {errors.username !== "" && (
          <h3 className="form-error">{errors.username}</h3>
        )}
      </div>
      <div className="form-control">
        <label className="form-control__label" htmlFor="login-password">
          Password
        </label>
        <input
          onChange={onChange}
          value={values.password}
          className="form-control__input"
          type="password"
          name="password"
          id="login-password"
        />
        {errors.password !== "" && (
          <h3 className="form-error">{errors.password}</h3>
        )}
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn__basic">
          Login
        </button>
      </div>
    </form>
  );
};

const LOGIN_USER = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      firstName
      lastName
      token
      email
      createdAt
    }
  }
`;

export default LoginForm;
