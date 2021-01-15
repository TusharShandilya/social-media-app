import React from "react";

import { Layout } from "../components/Layout";
import { RegisterForm } from "../containers/Forms";

const Register: React.FC = () => {
  return (
    <Layout>
      <RegisterForm />;
    </Layout>
  );
};

export default Register;
