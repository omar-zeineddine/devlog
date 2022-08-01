import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin/Admin";
import AdminPanel from "../../components/AdminPanel/AdminPanel";

const AdminPage = () => (
  <Layout>
    <Admin>
      <div className="container">
        <AdminPanel />
      </div>
    </Admin>
  </Layout>
);
export default AdminPage;
