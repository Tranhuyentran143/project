import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogin } from "../../../api/user.api";
import { auth } from "../../../api/auth.api"
import FormLoginComponent from "../../../components/modecules/form-login/form-login";


const LoginAdminComponent = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const passwordRef = useRef();

  const login = async () => {
    const adminName = userRef.current.value;
    const password = passwordRef.current.value;

    const loginRes = await auth(adminName, password);
    if (!loginRes) {
      return;
    }

    localStorage.setItem("token", loginRes.access_token);
    try {
      const userInfo = await onLogin(adminName, password);
      if (userInfo && userInfo.role === "ADMIN") {
        navigate("/products");
      } else {
        // alert("Invalid credentials or not an admin account");
        navigate("/");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogin = async () => {
    await login();
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <FormLoginComponent
        titleLogin="Name"
        titlePassword="Password"
        submit={handleLogin}
      />
    </div>
  );
}

export default LoginAdminComponent;