import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../AuthUser.context";
import useForm from "../../hooks/useForm";

import { Heading, Text } from "../../components/Typography";
import { CustomInputText } from "../../components/Inputs";
import { CustomButton } from "../../components/Button";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const context = React.useContext(AuthContext);
  const [errors, setErrors] = React.useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { values, onSubmit, onChange } = useForm<RegisterFormValues>(
    {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    handleRegistration
  );

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
    },
    variables: values,
    onError({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        setErrors(graphQLErrors[0].extensions!.exception.errors);
      }
    },
  });

  function handleRegistration() {
    registerUser();
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <Heading size="xl" className="text-centered">
        REGISTER
      </Heading>
      <div className="form-control">
        <CustomInputText
          autoFocus
          id="register-firstName"
          label="First Name"
          name="firstName"
          type="text"
          value={values.firstName}
          handleChange={onChange}
          error={errors.firstName}
          required
          styleClass="margin-r-md"
        />
        <CustomInputText
          id="register-lastName"
          label="Last Name"
          name="lastName"
          type="text"
          value={values.lastName}
          handleChange={onChange}
          error={errors.lastName}
        />
      </div>
      <div className="form-control">
        <CustomInputText
          handleChange={onChange}
          id="register-username"
          label="Username"
          type="text"
          name="username"
          value={values.username}
          error={errors.username}
          required
        />
      </div>
      <div className="form-control">
        <CustomInputText
          handleChange={onChange}
          id="register-email"
          label="Email"
          type="email"
          name="email"
          value={values.email}
          error={errors.email}
          required
        />
      </div>
      <div className="form-control">
        <CustomInputText
          handleChange={onChange}
          id="register-password"
          label="Password"
          type="password"
          name="password"
          value={values.password}
          error={errors.password}
          required
        />
      </div>
      <div className="form-control">
        <CustomInputText
          id="register-confirmPassword"
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          handleChange={onChange}
          error={errors.confirmPassword}
          required
        />
      </div>
      <div className="form-control margin-y-lg">
        <CustomButton type="submit" styleClass="full-width" color="success">
          <FontAwesomeIcon icon={faUserPlus} /> Register
        </CustomButton>
      </div>
      <Text>
        Already a member?
        <Link to="/login">
          <span className="link"> Sign in.</span>
        </Link>
      </Text>
    </form>
  );
};

const REGISTER_USER = gql`
  mutation(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      username
      token
      createdAt
      firstName
      lastName
      email
      id
    }
  }
`;

export default RegisterForm;
