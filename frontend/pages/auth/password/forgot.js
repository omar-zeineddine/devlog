import { useState } from "react";
import Layout from "../../../components/Layout";
import { forgotPass } from "../../../actions/auth";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    message: "",
    error: "",
    showForm: true,
  });

  const { email, message, error, showForm } = values;

  const handleInputChange = (name) => (event) => {
    setValues({
      ...values,
      message: "",
      error: "",
      [name]: event.target.value,
    });

    console.log(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({ ...values, message: "", error: "" });
    const data = await forgotPass({ email });
    if (data.error) {
      setValues({
        ...values,
        message: data.message,
        email: "",
        showForm: false,
      });
      setValues({ ...values, error: data.error });
    } else {
      setValues({
        ...values,
        message: data.message,
        email: "",
        showForm: false,
      });
    }
  };

  const alertSuccess = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  const alertError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  return (
    <Layout>
      <div className="container">
        <div className="col-lg-8 mx-auto pt-5">
          {alertSuccess()}
          {alertError()}
        </div>
        <div className="col-lg-8 mx-auto pt-5">
          <h3 className="text-center pb-3">Forgot Password</h3>
          <p className="bg-gray text-center text-light p-1">
            Enter the email address you signed up with to receive the reset
            link.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group pt-3">
              <input
                type="email"
                onChange={handleInputChange("email")}
                className="form-control"
                value={email}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mx-auto">
                Request Password Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
