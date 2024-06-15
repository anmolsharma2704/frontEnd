import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow, MDBInput } from "mdb-react-ui-kit";
import axiosInstance from "../Components/api";

function ResetPassword() {
const navigate = useNavigate();
const { resetToken } = useParams();
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
const [successMessage, setSuccessMessage] = useState("");

const validatePassword = (password) => {
// Validate password complexity
return /^(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

const handlePasswordChange = (event) => {
setPassword(event.target.value);
};

const handleConfirmPasswordChange = (event) => {
setConfirmPassword(event.target.value);
};

const handleResetPassword = async (e) => {
e.preventDefault();

if (!validatePassword(password)) {
  setError("Password must have at least one capital letter, one number, and one special character.");
  return;
}

if (password !== confirmPassword) {
  setError("Passwords do not match.");
  return;
}

try {
  const response = await axiosInstance.put('/reset', {
    resetToken,
    password,
  });

  setSuccessMessage(response.data.message);
  setPassword('');
  setConfirmPassword('');
  setTimeout(() => {
    navigate('/login');
  }, 5000); // Redirect after 5 seconds
} catch (error) {
  setError(error.response.data.error);
}
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
<form onSubmit={handleResetPassword}>
<MDBInput
           wrapperClass="mb-4"
           label="Password"
           id="password"
           type="password"
           size="lg"
           value={password}
           onChange={handlePasswordChange}
           required
         />
<MDBInput
           wrapperClass="mb-4"
           label="Confirm Password"
           id="ConfirmPassword"
           type="password"
           size="lg"
           value={confirmPassword}
           onChange={handleConfirmPasswordChange}
           required
         />
{error && <p className="text-danger">{error}</p>}
{successMessage && <p className="text-success">{successMessage}</p>}
<div className="d-grid gap-2">
<button
             className="btn btn-primary mb-4 w-100"
             size="lg"
             type="submit"
           >
Reset Password
</button>
</div>
</form>
</MDBCol>
</MDBRow>
</MDBContainer>
);
}

export default ResetPassword;