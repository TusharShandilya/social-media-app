import React from "react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../../context/AuthUser.context";
import useForm from "../../hooks/useForm";
import CustomInput from "../CustomInput";

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
      <div className="form-control">
        <CustomInput
          id="register-firstName"
          label="First Name"
          name="firstName"
          type="text"
          value={values.firstName}
          handleChange={onChange}
          error={errors.firstName}
          required
        />
        <CustomInput
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
        <CustomInput
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
        <CustomInput
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
        <CustomInput
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
        <CustomInput
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
      <div className="form-control">
        <button type="submit" className="btn btn__basic">
          Register
        </button>
      </div>
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
