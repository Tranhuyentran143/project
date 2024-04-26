import React from "react";
import { useNavigate } from "react-router-dom";
import FormLoginComponent from "../../components/modecules/form-login/form-login";
import { onLoginCus } from "../../api/user.api";

const LoginCustomerComponent = () => {
  const navigate = useNavigate();

  const loginCustomer = async (userName, pass) => {
    try {
      const userInfo = await onLoginCus(userName, pass);
      if (userInfo && userInfo.role === "USER") {
        return userInfo;
      } else {
        alert("Invalid credentials or not a user account");
        return undefined;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return undefined;
    }
  };

  const handleLoginCustomer = async (userName, pass) => {
    const loggedIn = await loginCustomer(userName, pass);
    if (loggedIn) {
      navigate("/products");
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <FormLoginComponent
        titleLogin="Username"
        titlePassword="Password"
        submit={handleLoginCustomer}
      />
    </div>
  );
};

export default LoginCustomerComponent;
