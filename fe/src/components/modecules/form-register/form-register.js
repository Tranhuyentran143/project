import { useRef } from "react";
import { Link } from "react-router-dom";

const FormRegisterComponent = (props) => {

  const { titleRegister, titleEmail, titlePassword, titleRepeatPassword, submit, login_here } = props;

  const userRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const repeatPasswordRef = useRef("");

  const onSubmit = () => {
    if (submit) {
      submit(userRef.current.value, emailRef.current.value, passwordRef.current.value, repeatPasswordRef.current.value);
    }
  };
  return (<div className="w-100 p-3 ">
    <div className="mask d-flex align-items-center h-100 gradient-custom-3">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-7 col-xl-6">
            <div className="card" style={{ borderRadius: '15px' }}>
              <div className="card-body p-5">
                <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                <div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1cg" >{titleRegister} </label>
                    <input type="text" id="form3Example1cg" className="form-control form-control-lg" ref={userRef} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3cg">{titleEmail}</label>
                    <input type="email" id="form3Example3cg" className="form-control form-control-lg" ref={emailRef} />
                  </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4cg"> {titlePassword} </label>
                    <input type="password" id="form3Example4cg" className="form-control form-control-lg" ref={passwordRef} />
                  </div>

                  <div className=" form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4cdg"> {titleRepeatPassword} </label>
                    <input type="password" id="form3Example4cdg" className="form-control form-control-lg" ref={repeatPasswordRef} />
                  </div>

                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={onSubmit}>Register</button>
                  </div>
                  <p className="text-center text-muted mt-5 mb-0">Have already an account?
                    <Link to={"/login"}>Login Here</Link> </p>
                  {/* className="fw-bold text-body" onClick={login_here}><u>Login here</u></a></p> */}

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export default FormRegisterComponent;
