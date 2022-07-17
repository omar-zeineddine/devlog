import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import { withRouter } from "next/router"; // get access to router props
import { getCookie, isAuthenticated } from "../../../actions/auth";
import { getCategories } from "../../../actions/category";
import { getTags } from "../../../actions/tag";
import { createBlog } from "../../../actions/blog";
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

  const [body, setBody] = useState({ getBlogDataFromLs });
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishBtn: false,
  });

  const { error, sizeError, success, formData, title, hidePublishBtn } = values;

  // have formData ready to use when component mounts
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

    console.log(allCheckedCategories);
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

    console.log(allCheckedTags);
  };

  const publishBlog = (e) => {
    e.preventDefault();
    console.log("blog created");
  };

  const handleChange = (name) => (e) => {
    /* console.log(e.target.value); */
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    // form data to be processed by the backend to create a new blog
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    /* console.log(e); */
    // push the event into body
    setBody(e);
    // populate form data
    formData.set("body", e);
    // save to local storage to prevent data loss on page refresh
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-xl-8 mb-4">
          <form onSubmit={publishBlog}>
            <div className="form-group">
              <label htmlFor="title">Blog Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder=""
                onChange={handleChange("title")}
              />
            </div>
            <div className="form-group">
              <ReactQuill
                modules={CreateBlog.modules}
                formats={CreateBlog.formats}
                value={body}
                placeholder=""
                onChange={handleBody}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Publish
            </button>
          </form>
        </div>
        <div className="col-xl-4">
          <h5>Categories</h5>
          <ul
            className="list-unstyled"
            style={{ maxHeight: "140px", overflowY: "scroll" }}
          >
            {categories &&
              categories.map((category) => (
                <li key={category._id}>
                  <input
                    onChange={handleCatToggleCheckbox(category._id)}
                    type="checkbox"
                    className="mr-2"
                  />
                  <label className="form-check-label">{category.name}</label>
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
                  <input
                    onChange={handleTagToggleCheckbox(tag._id)}
                    type="checkbox"
                    className="mr-2"
                  />
                  <label className="form-check-label">{tag.name}</label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// react-quill toolbar modules
CreateBlog.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["code-block"],
  ],
};

CreateBlog.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(CreateBlog);
