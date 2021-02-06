import React from "react";
import { gql, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { AuthContext } from "../../AuthUser.context";
import useForm from "../../hooks/useForm";

import { Heading, Paragraph } from "../common/Typography";
import { CustomInputText } from "../common/Inputs";
import { CustomButton } from "../common/Button";
import { Card } from "../common/Card";

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
      console.log(userData);
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
    <form className="form login-form " onSubmit={onSubmit}>
      <Card>
        <Heading size="lg" className="text-centered title is-uppercase">
          LOGIN
        </Heading>

        {errors.general !== "" && (
          <h4 className="input-text__error">{errors.general}</h4>
        )}
        <div className="form-control">
          <CustomInputText
            id="login-username"
            label="Username"
            type="text"
            name="username"
            value={values.username}
            handleChange={onChange}
            required
            autoFocus
          />
        </div>
        <div className="form-control">
          <CustomInputText
            id="login-password"
            label="Password"
            type="password"
            name="password"
            value={values.password}
            handleChange={onChange}
            required
          />
        </div>
        <Paragraph className="link text-right">
          Forgot username or password?
        </Paragraph>
        <div className="form-control margin-y-lg">
          <CustomButton type="submit" styleClass="full-width" variant="success">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </CustomButton>
        </div>
        <Paragraph className="text-centered">
          Not a member?
          <Link to="/register">
            <span className="link"> Sign up now.</span>
          </Link>
        </Paragraph>
      </Card>
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
      followers
      followerCount
      following
      followingCount
      createdAt
    }
  }
`;

export default LoginForm;
