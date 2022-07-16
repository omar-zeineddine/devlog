import { useState, useEffect } from "react";
import {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
} from "../../../actions/category";
import { isAuthenticated, getCookie } from "../../../actions/auth";

const Categories = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  });
  const { name, error, success, categories, removed, reload } = values;
  const token = getCookie("token");

  // use Effect hook to list show all categories
  useEffect(() => {
    loadCategories();
  }, [reload]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, categories: data });
      }
    });
  };

  // loop through categories from state
  const showCategories = () => {
    return categories.map((cat, idx) => {
      return (
        <button key={idx} className="btn btn-outline-primary mr-1 ml-1 mt-2">
          {cat.name}
        </button>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("create category");
    createCategory({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          error: false,
          success: true,
          name: "",
          removed: !removed,
          reload: !reload,
        });
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

  return (
    <>
      {newCategoryForm()}
      <div>{showCategories()}</div>
    </>
  );
};

export default Categories;
