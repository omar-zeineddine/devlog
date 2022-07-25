import Link from "next/link";
import Layout from "../../components/Layout";
import moment from "moment";
import { userProfile } from "../../actions/user";
import ContactForm from "../../components/form/ContactForm";

const UserProfile = ({ user, blogs, query }) => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h5>{user.name}</h5>
                <p className="text-muted">
                  Joined {moment(user.createdAt).fromNow()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="p-3 mb-2 bg-info text-white">{`Latest blogs by ${user.name}`}</div>
                {blogs.map((blog, idx) => (
                  <div className="py-2" key={idx}>
                    <Link href={`/blogs/${blog.slug}`}>
                      <a className="lead">{blog.title}</a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="p-3 mb-2 bg-info text-white">{`Message ${user.name}`}</div>
                <ContactForm authorEmail={user.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

UserProfile.getInitialProps = async ({ query }) => {
  const response = await userProfile(query.username);
  return { user: response.user, blogs: response.blogs, query };
};

export default UserProfile;
