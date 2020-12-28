import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthUser.context";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        {/* 
        TODO: Routing here
          PAGES: 
          1. POSTS/HOME
          2. PROFILE SETTINGS
          3. SINGLE POST PAGE
          4. SINGLE USER INFO PAGE
        */}
      </AuthProvider>
    </Router>
  );
}

export default App;
