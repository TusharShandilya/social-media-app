import React from "react";

import { Layout } from "../components/common/Layout";
import { LoginForm } from "../components/CustomForms";

const Login: React.FC = () => {
  return (
    <Layout title="Login">
      <LoginForm />
    </Layout>
  );
};

export default Login;
