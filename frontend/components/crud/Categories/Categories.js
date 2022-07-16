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
        <button
          title={"Double Click to delete Category"}
          onDoubleClick={() => confirmDelete(cat.slug)}
          key={idx}
          className="btn btn-outline-primary mr-1 ml-1 mt-2"
        >
          {cat.name}
        </button>
      );
    });
  };

  // confirm delete category on double click
  const confirmDelete = (slug) => {
    let ans = window.confirm("Are you sure you want to delete category");
    if (ans) {
      deleteCat(slug);
    }
  };

  // deleteCat function
  const deleteCat = (slug) => {
    // console.log("delete", slug);
    deleteCategory(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          error: false,
          success: false,
          name: "",
          removed: !removed,
          reload: !reload,
        });
      }
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

  // state based alerts helper methods
  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Category Created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Category already exists</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Category removed</p>;
    }
  };

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: "" });
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
      {showSuccess()}
      {showRemoved()}
      {showError()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryForm()}
        {showCategories()}
      </div>
    </>
  );
};

export default Categories;
