import Layout from "../components/Layout";
import SignupComponent from "../components/auth/SignupComponent/SignupComponent";
import Link from "next/link";

const Signup = () => (
  <Layout>
    <h2 className="text-center pt-4 pb-4">Register</h2>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <SignupComponent />
      </div>
    </div>
  </Layout>
);

export default Signup;
