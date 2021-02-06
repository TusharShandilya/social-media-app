import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";

import "./styles/main.scss";

import { AuthProvider } from "./AuthUser.context";
import apolloClient from "./config/ApolloClient";

import Navbar from "./components/common/Navigation/Navbar";
import Routes from "./components/Routes";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes />
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
