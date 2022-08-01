import Link from "next/link";
import styles from "./UserPanel.module.scss";

const UserPanel = () => {
  return (
    <div className="container">
      <h4 className={`${styles.userPanel_Title} py-2 mb-2`}>User Panel</h4>
      <div className="row">
        <div className="col-md-6">
          <ul className={styles.userPanel_ListGroup}>
            {/* create blog */}
            <li className={styles.userPanel_ListGroupItem}>
              <img
                className={styles.userPanel_ListGroupItem_Icon}
                src="assets/icons/create.png"
                alt=""
              />
              <Link href="/user/crud/blog">
                <a>Create Blog</a>
              </Link>
            </li>

            {/* update blogs */}
            <li className={styles.userPanel_ListGroupItem}>
              <img
                className={styles.userPanel_ListGroupItem_Icon}
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
          <ul className={styles.userPanel_ListGroup}>
            {/* Profile */}
            <li className={styles.userPanel_ListGroupItem}>
              <img
                className={styles.userPanel_ListGroupItem_Icon}
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

export default UserPanel;
