import Layout from "../../components/Layout";
import Private from "../../components/auth/Private/Private";
import UserPanel from "../../components/UserPanel/UserPanel";

const UserPage = () => (
  <Layout>
    <Private>
      <UserPanel />
    </Private>
  </Layout>
);

export default UserPage;
