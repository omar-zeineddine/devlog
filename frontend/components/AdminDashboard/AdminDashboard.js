import Link from "next/link";
import styles from "./AdminDashboard.module.scss";

const AdminDashboard = () => {
  return (
    <div className="container">
      <h4 className={`${styles.adminDashboard__Title} py-2 mb-2`}>
        Admin Dashboard
      </h4>
      <div className="row">
        <div className="col-md-6">
          <ul className={styles.adminDashboard__listGroup}>
            {/* Categories */}
            <li className={styles.adminDashboard__listGroupItem}>
              <img
                className={styles.adminDashboard__listGroupItem__icon}
                src="assets/icons/categories.png"
                alt=""
              />
              <Link href="/admin/crud/category">
                <a>Manage Categories</a>
              </Link>
            </li>
            {/* Tags*/}
            <li className={styles.adminDashboard__listGroupItem}>
              <img
                className={styles.adminDashboard__listGroupItem__icon}
                src="assets/icons/tags.png"
                alt=""
              />
              <Link href="/admin/crud/tag">
                <a>Manage Tags</a>
              </Link>
            </li>
            {/* create blog */}
            <li className={styles.adminDashboard__listGroupItem}>
              <img
                className={styles.adminDashboard__listGroupItem__icon}
                src="assets/icons/create.png"
                alt=""
              />
              <Link href="/admin/crud/blog">
                <a>Create Blog</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className={styles.adminDashboard__listGroup}>
            {/* Blogs */}
            <li className={styles.adminDashboard__listGroupItem}>
              <img
                className={styles.adminDashboard__listGroupItem__icon}
                src="assets/icons/update-delete.png"
                alt=""
              />
              <Link href="/admin/crud/blogs">
                <a>Update / Delete Blogs</a>
              </Link>
            </li>
            {/* Profile */}
            <li className={styles.adminDashboard__listGroupItem}>
              <img
                className={styles.adminDashboard__listGroupItem__icon}
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

export default AdminDashboard;
