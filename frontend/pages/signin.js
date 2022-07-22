import Layout from "../components/Layout";
import SigninComponent from "../components/auth/SigninComponent/SigninComponent";
import Link from "next/link";

const Signin = () => (
  <Layout>
    <h2 className="text-center pt-4 pb-4">Login</h2>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <SigninComponent />
      </div>
    </div>
  </Layout>
);

export default Signin;
