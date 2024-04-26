import FormRegisterComponent from "../../components/modecules/form-register/form-register";

const RegisterComponent = (props) => {
  const resgiter = async (userName, email, pass, repeatPass) => {
    // Kiểm tra logic đăng ký
    if (userName == "" || email == "" || pass == "" || repeatPass == "") {
      alert("Please enter all required fields");
      return;
    }

    if (pass != repeatPass) {
      alert("Passwords do not match");
      return;
    } try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        body: JSON.stringify({
          userName,
          email,
          pass,
        }),
      });

      if (response.status === 201) {
        console.log('Đã đăng ký thành công!');
        alert("Registration successful! You can log in now.");
      } else {
        console.error('Có lỗi khi đăng ký:', response);
        alert('There was an error during registration. Please try again later!');
      }
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      alert('There was an error during registration. Please try again later!');
    }
  };

  const login_here = () => {
  };

  return (
    <div className="d-flex min-vh-100 align-items-center justify-content-center">
      <FormRegisterComponent
        titleRegister="Name"
        titleEmail="Email"
        titlePassword="Password"
        titleRepeatPassword="Repeat Password"
        submit={resgiter}
        login_here={login_here}
      />
    </div>
  );
};

export default RegisterComponent;
