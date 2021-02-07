import React from "react";

import { Layout } from "../components/common/Layout";
import { RegisterForm } from "../components/CustomForms";

const Register: React.FC = () => {
  return (
    <Layout title="Register">
      <RegisterForm />;
    </Layout>
  );
};

export default Register;
