import Link from "next/link";
import Categories from "../crud/Categories/Categories";

const AdminDashboard = () => {
  return (
    <section className="container-fluid">
      <div className="row">
        <div className="col-md-12 pt-5 pb-5">
          <h4>Admin Dashboard</h4>
        </div>
        <div className="col-md-6">
          <Categories />
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
