import { useState, useEffect } from "react";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import jwt from "jsonwebtoken";
import { signup } from "../../../../actions/auth";

const AccountActivate = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    error: "",
    loading: false,
    success: false,
    newPassword: "",
    showButton: true,
  });

  const { name, token, error, loading, success, showButton } = values;

  useEffect(() => {
    let token = router.query.id;

    if (token) {
      const { name } = jwt.decode(token);
      setValues({ ...values, name, token });
    }
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });

    const signup_user = await signup({ token });

    if (signup_user.error) {
      setValues({
        ...values,
        error: signup_user.error,
        loading: false,
        showButton: false,
      });
    } else {
      setValues({
        ...values,
        loading: false,
        success: true,
        showButton: false,
      });

      // router.replace("/signin");
    }
  };

  const showLoading = () =>
    loading ? <h4 className="text-center">Loading...</h4> : "";

  return (
    <Layout>
      <div className="container mt-5">
        <div className="row mx-auto">
          <div className="col-md-7 py-5 mx-auto">
            {showLoading()}

            {error && (
              <p className="text-center mt-5 alert alert-danger">{error}</p>
            )}

            {success && (
              <p className="text-center mt-5 alert alert-success">
                You have successfully activated your account. Please sign in
              </p>
            )}
            <h5 className="text-center">
              Hey {name}, ready to activate your account?
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="mx-auto">
            {showButton && (
              <button onClick={handleSubmit} className="btn btn-success">
                Activate Account
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(AccountActivate);
