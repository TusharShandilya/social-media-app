import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/main.scss";

import { AuthProvider } from "./AuthUser.context";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/ApolloClient";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

function App() {
  return (
    <ApolloProvider client={client}>
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
