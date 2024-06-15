import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,

} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Components/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    if (message === "Login successful") {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  const handleForgetPassword = async (e) => {
    navigate("/forgotPassword");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });

      // Assuming your backend returns a token upon successful login
      const { token } = response.data;

      // Store token in localStorage or sessionStorage
      localStorage.setItem("token", token);

      // Optionally, redirect to dashboard or perform other actions
      setMessage("Login successful");
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      // Handle login error, show error message, etc.
      if (error.response.status === 401) {
        setMessage("Invalid Email address or password.");
      } else {
        setMessage("An error occurred during login.");
      }
    }
  };

  const RegisterHandler = () => {
    navigate("/register");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phoneimage"
          />
        </MDBCol>
        <MDBCol col="4" md="6">
          <form onSubmit={handleLogin}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type={showPassword ? "text" : "password"} // Conditionally show text or password type
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="d-flex justify-content-between mx-4 mb-4">
              
                <btn type="button" onClick={handleForgetPassword} style={{ color: "blue" }}>
                  Forgot password?
                </btn>
              
              <button
                type="button"
                className="btn btn-link"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            {message && <p className="text-danger">{message}</p>}{" "}
            {/* Display error message */}
            <div className="d-grid gap-2">
              <button
                className="btn btn-primary mb-4 w-100"
                size="lg"
                type="submit"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
            <button
              className="btn btn-primary"
              style={{ backgroundColor: "#3b5998" }}
              onClick={RegisterHandler}
            >
              Register here
            </button>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
