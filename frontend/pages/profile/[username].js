import Layout from "../../components/Layout";
import moment from "moment";
import { userProfile } from "../../actions/user";

const UserProfile = ({ user, blogs }) => {
  return (
    <>
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
                  {JSON.stringify(blogs)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

UserProfile.getInitialProps = async ({ query: { username } }) => {
  const response = await userProfile(username);
  return { user: response.user, blogs: response.blogs };
};

export default UserProfile;
