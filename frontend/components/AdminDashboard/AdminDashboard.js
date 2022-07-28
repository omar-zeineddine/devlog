import Link from "next/link";
// import Categories from "../crud/Categories/Categories";
// import CreateBlog from "../crud/CreateBlog/CreateBlog";
import styles from "./AdminDashboard.module.scss";

const AdminDashboard = () => {
  return (
    <section className={`${styles.adminDashboard} `}>
      <div>
        <h4 className={`${styles.adminDashboard__Title} py-2 mb-2`}>
          Admin Dashboard
        </h4>
      </div>
      <div className="row">
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
    </section>
  );
};

export default AdminDashboard;
