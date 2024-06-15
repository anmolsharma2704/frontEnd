import 'bootstrap/dist/css/bootstrap.min.css'; 
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput
} from 'mdb-react-ui-kit';
import {  useNavigate } from 'react-router-dom';
import axiosInstance from './api'

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
 // Define protocol and host
 const protocol = window.location.protocol;
 const host = window.location.host;
 const baseURL = `${protocol}//${host}`;

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
       await axiosInstance.post('/password/forgot', { email,baseURL });
      setMessage('Reset Password Link successfully sent to ' + email);
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
    
      if (error.response?.status === 401) {
        setMessage('Invalid Email address.');
      } else if (error.response?.status === 404) {
        setMessage('No user found with this Email address: ' + email);
      } else {
        setMessage('An error occurred during sending mail.');
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phoneimage" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <form onSubmit={handleForgetPassword}>
            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size='lg' value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="d-grid gap-2">
              <button className="btn btn-primary mb-4 w-100" size="lg" type="submit">Send Reset Link</button>
            </div>
          </form>
          {message && <p className="text-success">{message}</p>}
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">
              Remembered your password?
            </p>
            <button
              className="btn btn-primary"
              onClick={handleLoginClick}
              style={{ backgroundColor: "#3b5998" }}
            >Login Here
            </button>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ForgotPassword;
