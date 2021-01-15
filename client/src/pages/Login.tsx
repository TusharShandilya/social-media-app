import React from "react";

import { Layout } from "../components/Layout";
import { LoginForm } from "../containers/Forms";

const Login: React.FC = () => {
  return (
    <Layout title="Login">
      <LoginForm />
    </Layout>
  );
};

export default Login;
