import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin/Admin";
import Tag from "../../../components/crud/Tag/Tag";

const TagPage = () => (
  <Layout>
    <Admin>
      <div className="row">
        <div className="col-md-12 py-5">
          <h4>Manage Tags</h4>
        </div>
        <div className="col-md-6">
          <Tag />
        </div>
      </div>
    </Admin>
  </Layout>
);
export default TagPage;
