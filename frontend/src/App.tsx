import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthUser.context";
import AuthRoute from "./utils/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Route exact path="/" component={Home} />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/register" component={Register} />
        {/* 
        TODO: Routing here
          PAGES: 
          1. POSTS/HOME --done
          2. PROFILE SETTINGS
          3. SINGLE POST PAGE
          4. SINGLE USER INFO PAGE
          5. LOGIN --done
          6. REGISTER --done
        */}
      </AuthProvider>
    </Router>
  );
}

export default App;
