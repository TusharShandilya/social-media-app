import React from "react";

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
  const { values, onSubmit, onChange } = useForm<RegisterFormValues>(
    {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    () => {
      console.log("register");
    }
  );
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
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn__basic">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
