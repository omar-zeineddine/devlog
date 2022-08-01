import Link from "next/link";
import styles from "./AdminPanel.module.scss";

const AdminPanel = () => {
  return (
    <div className="container">
      <h4 className={`${styles.adminPanel_Title} py-2 mb-2`}>Admin Panel</h4>
      <div className="row">
        <div className="col-md-6">
          <ul className={styles.adminPanel_ListGroup}>
            {/* Categories */}
            <li className={styles.adminPanel_ListGroupItem}>
              <img
                className={styles.adminPanel_ListGroupItem_Icon}
                src="assets/icons/categories.png"
                alt=""
              />
              <Link href="/admin/crud/category">
                <a>Manage Categories</a>
              </Link>
            </li>

            {/* Tags*/}
            <li className={styles.adminPanel_ListGroupItem}>
              <img
                className={styles.adminPanel_ListGroupItem_Icon}
                src="assets/icons/tags.png"
                alt=""
              />
              <Link href="/admin/crud/tag">
                <a>Manage Tags</a>
              </Link>
            </li>
            {/* create blog */}
            <li className={styles.adminPanel_ListGroupItem}>
              <img
                className={styles.adminPanel_ListGroupItem_Icon}
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
          <ul className={styles.adminPanel_ListGroup}>
            {/* Blogs */}
            <li className={styles.adminPanel_ListGroupItem}>
              <img
                className={styles.adminPanel_ListGroupItem_Icon}
                src="assets/icons/update-delete.png"
                alt=""
              />
              <Link href="/admin/crud/blogs">
                <a>Update / Delete Blogs</a>
              </Link>
            </li>
            {/* Profile */}
            <li className={styles.adminPanel_ListGroupItem}>
              <img
                className={styles.adminPanel_ListGroupItem_Icon}
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

export default AdminPanel;
