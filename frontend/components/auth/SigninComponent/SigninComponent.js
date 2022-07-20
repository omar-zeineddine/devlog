import { useState, useEffect } from "react";
import { signin, authenticate, isAuthenticated } from "../../../actions/auth";
import { useRouter } from "next/router";
import FormInput from "../../FormInput/FormInput";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "user@user.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const { email, password, error, loading } = values;
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

  return (
    <section>
      <div>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary">
            SIGN IN
          </button>
        </form>
      </div>
    </section>
  );
};

export default SigninComponent;
