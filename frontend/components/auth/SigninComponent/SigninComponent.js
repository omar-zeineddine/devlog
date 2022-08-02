import { useState, useEffect } from "react";
import { signin, authenticate, isAuthenticated } from "../../../actions/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import FormInput from "../../FormInput/FormInput";
import styles from "./SigninComponent.module.scss";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, message, loading } = values;
  const router = useRouter();

  useEffect(() => {
    isAuthenticated() && router.push("/");
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const userData = { email, password };

    signin(userData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // store token in cookie
        // save userinfo to local storage -> authenticate user
        authenticate(data, () => {
          if (isAuthenticated() && isAuthenticated().role === 1) {
            router.push("/admin");
          } else {
            router.push("/user");
          }
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  return (
    <div className="container">
      <div className={styles.messages}>
        {showError()}
        {showLoading()}
        {showMessage()}
      </div>
      <section className={`${styles.signinForm} my-0`}>
        <div>
          <h2 className={`${styles.signinFormTitle} mt-0`}>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <FormInput
              onChange={handleChange("email")}
              type="email"
              label="Enter email"
              value={email}
            />

            <FormInput
              onChange={handleChange("password")}
              type="password"
              label="Enter password"
              value={password}
            />

            <button type="submit" className={styles.signinFormSigninBtn}>
              SIGN IN
            </button>
            <div className="text-center">
              <Link href="/auth/password/forgot">
                <a className={styles.forgotPass}>Forgot Password?</a>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SigninComponent;
