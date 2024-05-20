// import FormRegisterComponent from "../../components/modecules/form-register/form-register";

// const RegisterComponent = (props) => {
//   const resgiter = async (userName, email, pass, repeatPass) => {
//     // Kiểm tra logic đăng ký
//     if (userName == "" || email == "" || pass == "" || repeatPass == "") {
//       alert("Please enter all required fields");
//       return;
//     }

//     if (pass != repeatPass) {
//       alert("Passwords do not match");
//       return;
//     } try {
//       const response = await fetch('http://localhost:8081/api/v1/users', {
//         method: 'POST',
//         body: JSON.stringify({
//           userName,
//           email,
//           pass,
//         }),
//       });

//       if (response.status === 201) {
//         console.log('Đã đăng ký thành công!');
//         alert("Registration successful! You can log in now.");
//       } else {
//         console.error('Có lỗi khi đăng ký:', response);
//         alert('There was an error during registration. Please try again later!');
//       }
//     } catch (error) {
//       console.error('Lỗi khi đăng ký:', error);
//       alert('There was an error during registration. Please try again later!');
//     }
//   };

//   const login_here = () => {
//   };

//   return (
//     <div className="d-flex min-vh-100 align-items-center justify-content-center">
//       <FormRegisterComponent
//         titleRegister="Name"
//         titleEmail="Email"
//         titlePassword="Password"
//         titleRepeatPassword="Repeat Password"
//         submit={resgiter}
//         login_here={login_here}
//       />
//     </div>
//   );
// };

// export default RegisterComponent;
import React from "react";
import FormRegisterComponent from "../../components/modecules/form-register/form-register";
import { useNavigate } from "react-router-dom";

const RegisterCustomerComponent = () => {
  const navigate = useNavigate();

  const register = async (userName, phone, email, password, repeatPass) => {
    if (userName === "" || phone === "" || email === "" || password === "" || repeatPass === "") {
      alert("Please enter all required fields");
      return;
    }

    if (password !== repeatPass) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, userName, email, password }),
      });

      if (response.status === 201) {
        console.log('Registration successful!');
        alert("Registration successful! You can log in now.");
        navigate("/login");
      } else {
        console.error('Error during registration:', response);
        alert('There was an error during registration. Please try again later!');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('There was an error during registration. Please try again later!');
    }
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <FormRegisterComponent
        titleRegister="Name"
        titlePhone="Phone"
        titleEmail="Email"
        titlePassword="Password"
        titleRepeatPassword="Repeat Password"
        submit={register}
      />
    </div>
  );
};

export default RegisterCustomerComponent;
