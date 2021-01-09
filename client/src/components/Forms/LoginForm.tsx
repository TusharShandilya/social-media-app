import React from "react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../../AuthUser.context";
import useForm from "../../hooks/useForm";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const context = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState<{ general: string }>({
    general: "",
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
      {errors.general !== "" && (
        <h4 className="custom-input__error">{errors.general}</h4>
      )}
      <div className="form-control">
        <CustomInput
          id="login-username"
          label="Username"
          type="text"
          name="username"
          value={values.username}
          handleChange={onChange}
          required
        />
      </div>
      <div className="form-control">
        <CustomInput
          id="login-password"
          label="Password"
          type="password"
          name="password"
          value={values.password}
          handleChange={onChange}
          required
        />
      </div>
      <div className="form-control">
        <CustomButton type="submit">Login</CustomButton>
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
