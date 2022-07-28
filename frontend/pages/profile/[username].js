import Link from "next/link";
import Layout from "../../components/Layout";
import moment from "moment";
import { userProfile } from "../../actions/user";
import ContactForm from "../../components/form/ContactForm";

const UserProfile = ({ user, blogs, query }) => {
  return (
    <Layout>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body p-1">
              <h5>{user.name}</h5>
              <p className="text-muted">
                Joined {moment(user.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="p-3 mb-2 bg-main text-white">{`Latest blogs by ${user.name}`}</div>
              {blogs.map((blog, idx) => (
                <div className="py-2" key={idx}>
                  <Link href={`/blogs/${blog.slug}`}>
                    <a className="lead">{blog.title}</a>
                  </Link>

                  <p className="profile__blog-card__posted">
                    Posted at -
                    <span className="profile__blog-card__posted-date">
                      {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-5">
            <div className="card-body">
              <div className="p-3 mb-2 bg-main text-white">{`Message ${user.name}`}</div>
              <ContactForm authorEmail={user.email} />
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
