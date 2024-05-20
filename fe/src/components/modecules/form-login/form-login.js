import { useRef } from "react";
import { Link } from "react-router-dom";

const FormLoginComponent = (props) => {
  const { titleLogin, titlePassword, submit, forgot } = props;
  const userRef = useRef('');
  const passwordRef = useRef('');

  const onSubmit = () => {
    if (!submit) return;
    const userName = userRef.current?.value;
    const password = passwordRef.current?.value;
    if (userName && password) {
      submit(userName, password);
    } else {
      console.error("Username or password is empty");
    }
  };
  
  
  return (
    <div style={{ textAlign: "center", width: "30%", height: "50%" }}>
      <div style={{ textAlign: "left", borderRadius: '15px' }} className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">{titleLogin}</label>
        <input type="text" id="form2Example1" className="form-control" ref={userRef} />
      </div>

      <div style={{ textAlign: "left", borderRadius: '15px' }} className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">{titlePassword}</label>
        <input type="password" id="form2Example2" className="form-control" ref={passwordRef} />
      </div>

      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <label className="form-check-label" htmlFor="form2Example31">Remember me</label>
            <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
          </div>
        </div>
      </div>

      <button style={{ textAlign: "right" }} type="button" className="btn btn-primary btn-block mb-4" onClick={onSubmit}>Sign in</button>
      <Link style={{ textAlign: "left", marginLeft: "180px" }} to={"/register"}>Register Now</Link>
    </div>
  );
};

export default FormLoginComponent;
