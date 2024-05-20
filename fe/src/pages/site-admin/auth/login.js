import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormLoginComponent from "../../../components/modecules/form-login/form-login";
import { auth } from "../../../api/auth.api";

const LoginComponent = () => {
  const navigate = useNavigate();
  const userRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (userName, password) => {
    try {
      const loggedIn = await auth(userName, password);
      localStorage.setItem("token", loggedIn.access_token);
  
      if (loggedIn) {
        setIsLoggedIn(true);
          if (loggedIn.data.role === "admin") {
          alert("Welcome to admin!");
          navigate("/admin/dashboard");
        } else {
          alert("Hope you enjoy with our products!");
          navigate("/products");
        }
          window.location.reload();
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      navigate("/register");
    }
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <FormLoginComponent
        titleLogin="Name"
        titlePassword="Password"
        submit={handleLogin}
        userRef={userRef}
        passwordRef={passwordRef}
      />
    </div>
  );
};

export default LoginComponent;
