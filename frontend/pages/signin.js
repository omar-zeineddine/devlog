import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent/SigninComponent";
import { withRouter } from "next/router";

const Signin = ({ router }) => {
  const showRedirectMessage = () => {
    if (router.query.message) {
      return <div className="alert alert-danger">{router.query.message}</div>;
    } else {
      return;
    }
  };

  return (
    <Layout>
      {/* {JSON.stringify(router)} */}
      <div className="row">
        <div className="col-md-6 offset-md-3">{showRedirectMessage()}</div>
        <div className="col-md-6 offset-md-3">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Signin);
