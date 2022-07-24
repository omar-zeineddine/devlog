import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent/SignupComponent";
import Link from "next/link";

const Signup = () => (
  <Layout>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <SignupComponent />
      </div>
    </div>
  </Layout>
);

export default Signup;
