import React from "react";

import useForm from "../../hooks/useForm";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { values, onSubmit, onChange } = useForm<LoginFormValues>(
    { username: "", password: "" },
    () => {
      console.log("login");
    }
  );
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
      </div>
      <div className="form-control">
        <button type="submit" className="btn btn__basic">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
