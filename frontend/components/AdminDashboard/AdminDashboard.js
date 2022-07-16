import Link from "next/link";

const AdminDashboard = () => {
  return (
    <section>
      <div>
        <h4>Admin Dashboard</h4>
      </div>
      <ul>
        <li>
          <img src="images/dashboard-icons/category.svg" alt="" />
          <Link href="/admin/crud/category-tag">
            <a>Create Categories</a>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default AdminDashboard;
