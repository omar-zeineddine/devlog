import { useState } from "react";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import { resetPass } from "../../../../actions/auth";

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    error: "",
    message: "",
    showForm: true,
  });

  const { showForm, name, newPassword, error, message } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPass({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: "",
        });
      } else {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: "",
          error: false,
        });
      }
    });
  };

  const passwordResetForm = () => (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-8 mx-auto pt-5"></div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-md-8 mx-auto pt-5">
            {showError()}
            {showMessage()}
            <h3 className="text-center pb-3">Reset Password</h3>
            <p className="text-center pb-3">Please enter your new password.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group pt-3">
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) =>
                    setValues({ ...values, newPassword: e.target.value })
                  }
                  value={newPassword}
                  placeholder="Enter your new password"
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  return <>{passwordResetForm()}</>;
};

export default withRouter(ResetPassword);
