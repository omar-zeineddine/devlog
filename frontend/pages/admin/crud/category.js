import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin/Admin";
import Category from "../../../components/crud/Category/Category";

const CategoryPage = () => (
  <Layout>
    <Admin>
      <div className="row">
        <div className="col-md-12 py-5">
          <h4>Manage Categories</h4>
        </div>
        <div className="col-md-6">
          <Category />
        </div>
      </div>
    </Admin>
  </Layout>
);
export default CategoryPage;
