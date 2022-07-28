import Link from "next/link";
import styles from "./UserDashboard.module.scss";

const UserDashboard = () => {
  return (
    <div className="container">
      <h4 className={`${styles.userDashboard__Title} py-2 mb-2`}>
        Admin Dashboard
      </h4>
      <div className="row">
        <div className="col-md-6">
          <ul className={styles.userDashboard__listGroup}>
            {/* create blog */}
            <li className={styles.userDashboard__listGroupItem}>
              <img
                className={styles.userDashboard__listGroupItem__icon}
                src="assets/icons/create.png"
                alt=""
              />
              <Link href="/user/crud/blog">
                <a>Create Blog</a>
              </Link>
            </li>

            {/* update blogs */}
            <li className={styles.userDashboard__listGroupItem}>
              <img
                className={styles.userDashboard__listGroupItem__icon}
                src="assets/icons/update-delete.png"
                alt=""
              />
              <Link href="/user/crud/blogs">
                <a>Update / Delete Blogs</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className={styles.userDashboard__listGroup}>
            {/* Profile */}
            <li className={styles.userDashboard__listGroupItem}>
              <img
                className={styles.userDashboard__listGroupItem__icon}
                src="assets/icons/profile.png"
                alt=""
              />
              <Link href="/user/update">
                <a>Update Profile</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
