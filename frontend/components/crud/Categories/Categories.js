import { useState, useEffect } from "react";
import { createCategory } from "../../../actions/category";
import { isAuthenticated, getCookie } from "../../../actions/auth";

const Categories = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
  });
  const { name, error, success, categories, removed } = values;
  const token = getCookie("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("create category");
    createCategory({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({ ...values, error: false, success: true, name: "" });
      }
    });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  const newCategoryForm = () => (
    <form onClick={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          required
        />
      </div>

      <div>
        <button type="submit" className="btn btn-primary">
          create
        </button>
      </div>
    </form>
  );

  return <>{newCategoryForm()}</>;
};

export default Categories;
