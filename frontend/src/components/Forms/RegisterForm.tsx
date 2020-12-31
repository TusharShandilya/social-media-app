import React from "react";
import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../../context/AuthUser.context";
import useForm from "../../hooks/useForm";

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
        <label className="form-control__label" htmlFor="register-firstName">
          First Name
        </label>
        <input
          onChange={onChange}
          value={values.firstName}
          className="form-control__input"
          type="text"
          name="firstName"
          id="register-firstName"
        />
        {errors.firstName !== "" && (
          <h3 className="form-error">{errors.firstName}</h3>
        )}
      </div>
      <div className="form-control">
        <label className="form-control__label" htmlFor="register-lastName">
          Last Name
        </label>
        <input
          onChange={onChange}
          value={values.lastName}
          className="form-control__input"
          type="text"
          name="lastName"
          id="register-lastName"
        />
        {errors.lastName !== "" && (
          <h3 className="form-error">{errors.lastName}</h3>
        )}
      </div>
      <div className="form-control">
        <label className="form-control__label" htmlFor="register-username">
          Username
        </label>
        <input
          onChange={onChange}
          value={values.username}
          className="form-control__input"
          type="text"
          name="username"
          id="register-username"
        />
        {errors.username !== "" && (
          <h3 className="form-error">{errors.username}</h3>
        )}
      </div>
      <div className="form-control">
        <label className="form-control__label" htmlFor="register-email">
          Email
        </label>
        <input
          onChange={onChange}
          value={values.email}
          className="form-control__input"
          type="email"
          name="email"
          id="register-email"
        />
        {errors.email !== "" && <h3 className="form-error">{errors.email}</h3>}
      </div>
      <div className="form-control">
        <label className="form-control__label" htmlFor="register-password">
          Password
        </label>
        <input
          onChange={onChange}
          value={values.password}
          className="form-control__input"
          type="password"
          name="password"
          id="register-password"
        />
        {errors.password !== "" && (
          <h3 className="form-error">{errors.password}</h3>
        )}
      </div>
      <div className="form-control">
        <label
          className="form-control__label"
          htmlFor="register-confirmPassword"
        >
          Confirm password
        </label>
        <input
          onChange={onChange}
          value={values.confirmPassword}
          className="form-control__input"
          type="password"
          name="confirmPassword"
          id="register-confirmPassword"
        />
        {errors.confirmPassword !== "" && (
          <h3 className="form-error">{errors.confirmPassword}</h3>
        )}
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
