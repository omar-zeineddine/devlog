import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin/Admin";
import ReadBlogs from "../../../components/crud/ReadBlogs/ReadBlogs";

const Blogs = () => {
  return (
    <Layout>
      <Admin>
        <div className="row">
          <div className="col-md-12 py-5">
            <h4 className="text-center">Manage Blogs</h4>
          </div>
          <div className="col-xl-12">
            <ReadBlogs />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blogs;
