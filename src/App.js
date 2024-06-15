import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPasswordForm from "./Components/ResetPasswordForm";
import ResetPassword from "./Components/ResetPassword";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset/:resetToken" element={<ResetPasswordForm />} />
        <Route path="/password/reset/:resetToken" element={<ResetPassword/>} />

      </Routes>
    </Router>
  );
};

export default App;
