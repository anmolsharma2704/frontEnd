import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Components/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [avatarError, setAvatarError] = useState('');

  useEffect(() => {
    if (message === 'User registered successfully') {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 5000); // Redirect after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [message, navigate]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const isValidEmail = /\S+@\S+\.\S+/.test(event.target.value);
    if (!isValidEmail) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    const isValidPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        event.target.value
      );
    if (!isValidPassword) {
      setPasswordError(
        "Password must have at least one capital letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result); // This will be the base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );
    const passwordsMatch = password === confirmPassword;

    if (!isValidEmail) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword) {
      setPasswordError(
        "Password must have at least one capital letter, one number, and one special character."
      );
      return;
    }
    if (!passwordsMatch) {
      setPasswordError("Passwords do not match.");
      return;
    }

    const formData = {
      name,
      email,
      password,
      ...(avatar && { avatar }),
    };

    try {
      const response = await axiosInstance.post('/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('User registered successfully');

      console.log(response.data);

      // Clear form data
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAvatar('');
      setEmailError('');
      setPasswordError('');
      setRegistrationError('');
      setAvatarError(''); // Clear avatarError

    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || 'Error registering user';
        if (error.response.status === 413) {
          setRegistrationError('Image size is too large. Please upload an image smaller than 1MB.');
        } else if (errorMessage.includes('E11000')) {
          setRegistrationError('This email is already registered. Please use a different email.');
        } else {
          setRegistrationError(errorMessage);
        }
        console.error(`Registration Error: ${errorMessage}`);
      } else {
        const fallbackMessage = 'An unexpected error occurred during registration. Please try again later.';
        setRegistrationError(fallbackMessage);
        console.error(`Registration Error: ${error.message || fallbackMessage}`);
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone drawing"
          />
        </MDBCol>
        <MDBCol col="4" md="6">
          <h3 className="mb-4">Create an account</h3>
          <form onSubmit={handleSubmit}>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="formControlLg"
              type="text"
              size="lg"
              value={name}
              onChange={handleNameChange}
              required
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="formControlLg"
              type="email"
              size="lg"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="text-danger">{emailError}</p>}
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="text-danger">{passwordError}</p>}
            <MDBInput
              wrapperClass="mb-4"
              label="Confirm Password"
              id="formControlLg"
              type="password"
              size="lg"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            {!passwordError && password !== confirmPassword && (
              <p className="text-danger">Passwords do not match.</p>
            )}
            <div className="mb-4">
              <label htmlFor="avatarUpload" className="form-label">
                Upload Profile Avatar (optional)
              </label>
              <input
                className="form-control"
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              {avatarError && <p className="text-danger">{avatarError}</p>}
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary mb-4" size="lg" type="submit">
                Register
              </button>
            </div>
          </form>
          {message && <p className="text-success">{message}</p>}
          {registrationError && (
            <p className="text-danger">{registrationError}</p>
          )}
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">
              Already have an account?
            </p>
            <button
              className="btn btn-primary"
              onClick={handleLoginClick}
              style={{ backgroundColor: "#3b5998" }}
            >
              Login Here
            </button>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
