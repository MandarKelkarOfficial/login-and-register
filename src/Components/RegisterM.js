import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";

import "mdb-react-ui-kit/dist/css/mdb.min.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // For redirection after registration

  // Function to generate a random 6-digit OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log(`Generated OTP: ${otp}`); // For demo purposes, log it to the console.
  };

  // Handle OTP input and verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (enteredOtp === generatedOtp) {
      setOtpVerified(true);
      setError("");

      // Proceed with registration (you would normally send the data to your backend here)
      handleRegister();
    } else {
      setError("Invalid OTP, please try again.");
      setOtpVerified(false);
    }
  };

  // Handle the registration submission
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Redirect to dashboard after successful registration
        navigate("/dashboard");
      } else {
        setError("Registration failed, please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Server error, please try again later.");
    }
  };

  return (
    <MDBContainer
      fluid
      className="p-4 d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MDBRow className="w-100 d-flex justify-content-center align-items-center">
        <MDBCol md="6" lg="4">
          <MDBCard
            className="bg-glass"
            style={{ borderRadius: "1rem", backgroundColor: "rgba(255,255,255,0.9)" }}
          >
            <MDBCardBody className="p-5">
              <div className="text-center mb-4">
                <MDBIcon icon="user-plus" size="3x" style={{ color: "#ad1fff" }} />
                <h3 className="mt-3">Register</h3>
              </div>

              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {!generatedOtp && (
                <MDBBtn
                  className="mb-4 w-100"
                  color="purple"
                  onClick={generateOtp}
                >
                  Register & Generate OTP
                </MDBBtn>
              )}

              {generatedOtp && (
                <>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Enter OTP"
                    id="otpInput"
                    type="text"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                  />

                  <MDBBtn
                    className="mb-4 w-100"
                    color="purple"
                    onClick={handleOtpSubmit}
                  >
                    Verify OTP
                  </MDBBtn>

                  <p className="text-center text-muted">
                    <small>
                      Generated OTP (For Demo): <strong>{generatedOtp}</strong>
                    </small>
                  </p>
                </>
              )}

              {otpVerified && (
                <div className="text-center mt-3">
                  <MDBIcon
                    icon="check-circle"
                    size="2x"
                    style={{ color: "#28a745" }}
                  />
                  <p className="mt-2 text-success">OTP Verified Successfully!</p>
                </div>
              )}
              {error && <p className="text-danger text-center">{error}</p>}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Register;
