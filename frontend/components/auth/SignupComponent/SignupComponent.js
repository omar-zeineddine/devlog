import { useState } from "react";
import { preSignup } from "../../../actions/auth";
import styles from "./SignupComponent.module.scss";
const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "user",
    email: "user@user.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  // destructure values from state
  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle submit");
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const userData = { name, email, password };

    preSignup(userData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  // alerts
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <form className={styles.signupform} onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <button className={styles.signupform__signupBtn}>signup</button>
        </div>
      </form>
    );
  };

  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
};

export default SignupComponent;
