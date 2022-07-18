import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router"; // get access to router props
import { getCookie } from "../../../actions/auth";
import { getCategories } from "../../../actions/category";
import { getTags } from "../../../actions/tag";
import { createBlog } from "../../../actions/blog";
import { QuillModules, QuillFormats } from "../../../utils/Quill";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateBlog = ({ router }) => {
  // get blog data from local storage
  const getBlogDataFromLs = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  // states
  // categories and tags
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // check boxes toggles updates based on state
  const [checkedCats, setCheckedCats] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [body, setBody] = useState(getBlogDataFromLs());
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishBtn: false,
  });

  const { error, sizeError, success, formData, title, hidePublishBtn } = values;
  const token = getCookie("token");

  // have formData ready to use when component is loaded
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initCats();
    initTags();
  }, [router]);

  // initialize categories state
  const initCats = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  // initialize tags state
  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  // add or remove checked categories from state
  const handleCatToggleCheckbox = (catId) => () => {
    setValues({ ...values, error: "" });

    const allCheckedCategories = [...checkedCats];

    // get the index of current checked category
    const checkedCategory = checkedCats.indexOf(catId);

    // if checked category is not in the state, add it
    // else remove the category from the state
    if (checkedCategory === -1) {
      allCheckedCategories.push(catId);
    } else {
      allCheckedCategories.splice(checkedCategory, 1);
    }
    // console.log(allCheckedCategories);
    setCheckedCats(allCheckedCategories);
    formData.set("categories", allCheckedCategories);

    // console.log(allCheckedCategories);
  };

  // add or remove checked tags from state
  const handleTagToggleCheckbox = (tagId) => () => {
    setValues({ ...values, error: "" });

    const allCheckedTags = [...checkedTags];

    // get the index of current checked tag
    const checkedTag = checkedTags.indexOf(tagId);

    // if the current checked tag is not in the state, add it
    // else remove the tag from the state
    if (checkedTag === -1) {
      allCheckedTags.push(tagId);
    } else {
      allCheckedTags.splice(checkedTag, 1);
    }

    setCheckedTags(allCheckedTags);
    formData.set("tags", allCheckedTags);

    // console.log(allCheckedTags);
  };

  const publishBlog = (e) => {
    e.preventDefault();
    // console.log("blog created");
    createBlog(formData, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          error: "",
          success: `A new blog titled "${data.title}" has been created`,
        });
        // clear body, tags and categories
        setBody("");
        setCategories([]);
        setTags([]);
      }
    });

    // console.log("FORM DATA:", formData);
    // console.log(values);
  };

  const handleChange = (name) => (e) => {
    /* console.log(e.target.value); */
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    // form data to be processed by the backend to create a new blog
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    // console.log(e);
    // push the event into body
    setBody(e);
    // populate form data
    formData.set("body", e);
    // save to local storage to prevent data loss on page refresh
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  // display alerts
  const showError = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: success ? "" : "none" }}
    >
      {success}
    </div>
  );

  return (
    <>
      <div className="col-xl-8 mb-4 pb-2">
        <form onSubmit={publishBlog}>
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              placeholder="Title"
              onChange={handleChange("title")}
            />
          </div>
          <div className="form-group">
            <ReactQuill
              modules={QuillModules}
              formats={QuillFormats}
              value={body}
              placeholder=""
              onChange={handleBody}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Publish
          </button>
          {showError()}
          {showSuccess()}
        </form>
      </div>
      <div className="col-xl-4">
        <div className="form-group pb-3">
          <h5 className="mb-3">Featured Image</h5>

          <label className="btn btn-outline-info">
            Upload Image
            <input
              onChange={handleChange("photo")}
              type="file"
              accept="image/*"
              hidden
            />
          </label>
          <small className="text-muted ml-2">Max Size: 0.5MB</small>
        </div>
        <div>
          <h5>Categories</h5>
          <ul
            className="list-unstyled"
            style={{ maxHeight: "140px", overflowY: "scroll" }}
          >
            {categories &&
              categories.map((category) => (
                <li key={category._id}>
                  <label className="form-check-label">
                    <input
                      onChange={handleCatToggleCheckbox(category._id)}
                      type="checkbox"
                      className="mr-2"
                    />
                    {category.name}
                  </label>
                </li>
              ))}
          </ul>

          <hr />
          <h5>Tags</h5>
          <ul
            className="list-unstyled"
            style={{ maxHeight: "140px", overflowY: "scroll" }}
          >
            {tags &&
              tags.map((tag) => (
                <li key={tag._id}>
                  <label className="form-check-label">
                    <input
                      onChange={handleTagToggleCheckbox(tag._id)}
                      type="checkbox"
                      className="mr-2"
                    />
                    {tag.name}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default withRouter(CreateBlog);
