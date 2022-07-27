import { useState, useEffect } from "react";
import { initialSignup, isAuthenticated } from "../../../actions/auth";
import styles from "./SignupComponent.module.scss";
import FormInput from "../../FormInput/FormInput";
const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  // destructure values from state
  const { name, email, password, error, loading, message, showForm } = values;

  // useEffect hook to redirect logged in users
  useEffect(() => {
    isAuthenticated() && Router.push("/");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle submit");
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const userData = { name, email, password };

    initialSignup(userData).then((data) => {
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
      <section className={styles.signupForm}>
        <div>
          <h2 className={styles.signupForm__title}>Register</h2>

          <form onSubmit={handleSubmit}>
            <FormInput
              onChange={handleChange("name")}
              type="text"
              label="Name"
              value={name}
            />

            <FormInput
              onChange={handleChange("email")}
              type="email"
              label="Email"
              value={email}
            />

            <FormInput
              onChange={handleChange("password")}
              type="password"
              label="Password"
              value={password}
            />

            <button type="submit" className={styles.signupForm__signupBtn}>
              SIGN UP
            </button>
          </form>
        </div>
      </section>
    );
  };

  return (
    <>
      <div className={styles.signupForm__messages}>
        {showError()}
        {showLoading()}
        {showMessage()}
      </div>
      {showForm && signupForm()}
    </>
  );
};

export default SignupComponent;
