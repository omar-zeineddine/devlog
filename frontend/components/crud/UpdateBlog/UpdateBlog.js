import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuthenticated } from "../../../actions/auth";
import { getCategories } from "../../../actions/category";
import { getTags } from "../../../actions/tag";
import { showBlog, updateBlog } from "../../../actions/blog";
import { API } from "../../../config";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateBlog = ({ router }) => {
  const [body, setBody] = useState("");

  // states
  // categories and tags
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // check boxes toggles updates based on state
  const [checkedCats, setCheckedCats] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);

  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: new FormData(),
    title: "",
    body: "",
  });

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
    initCats();
    initTags();
    // console.log(checkedCategories, checkedTags);
  }, [router]);

  const { error, success, formData, title } = values;
  const { slug } = router.query;
  const token = getCookie("token");

  const initBlog = async () => {
    try {
      let blog = await showBlog(slug);
      if (blog) {
        setValues({ ...values, title: blog.title });
        setBody(blog.body);
        setCategoriesArray(blog.categories);
        setTagsArray(blog.tags);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // initialize categories and tags state
  const initCats = async () => {
    try {
      let categories = await getCategories();
      if (categories) {
        setCategories(categories);
      }
    } catch (error) {
      setValues({ ...values, error: categories.error });
      console.error(error);
    }
  };

  const initTags = async () => {
    try {
      let tags = await getTags();
      if (tags) {
        setTags(tags);
      }
    } catch (error) {
      setValues({ ...values, error: tags.error });
      console.error(error);
    }
  };

  // categories and tags id arrays
  const setCategoriesArray = (categories) => {
    let categoriesArray = [];
    categories.map((category) => categoriesArray.push(category._id));
    setCheckedCategories(categoriesArray);
  };

  const setTagsArray = (tags) => {
    let tagsArray = [];
    tags.map((tag) => tagsArray.push(tag._id));
    setCheckedTags(tagsArray);
  };

  const checkCatsAndTags = (arr, id) => {
    return arr.indexOf(id) === -1 ? false : true;
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  // add or remove checked categories from state
  const handleCatToggleCheckbox = (catId) => () => {
    setValues({ ...values, error: "" });

    const allCheckedCategories = [...checkedCats];

    // get the index of current checked category
    const checkedCategory = checkedCats.indexOf(catId);

    // if the current checked category is not in the state, add it
    // else remove the category from the state
    if (checkedCategory === -1) {
      allCheckedCategories.push(catId);
    } else {
      allCheckedCategories.splice(checkedCategory, 1);
    }

    setCheckedCategories(allCheckedCategories);
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
  const handleBody = (e) => {
    setBody(e);
    // save user changes to 'formData.body'
    formData.set("body", e);
  };

  const editBlog = async (event) => {
    // console.log("edit blog");
  };

  return (
    <>
      <div className="col-xl-8 mb-4 pb-2">
        <form onSubmit={editBlog}>
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              placeholder="Enter title"
              onChange={handleChange("title")}
            />
          </div>
          <div className="form-group">
            <ReactQuill
              modules={UpdateBlog.modules}
              formats={UpdateBlog.formats}
              bounds={".quill"}
              value={body}
              placeholder=""
              onChange={handleBody}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
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
        <div className="form-group pb-3">
          {body && (
            <img
              className="img img-fluid"
              src={`${API}/blog/photo/${slug}`}
              alt={title}
            />
          )}
        </div>
        <div>
          <h5>Categories</h5>
          <ul
            className="list-unstyled"
            style={{ maxHeight: "120px", overflowY: "scroll" }}
          >
            {categories &&
              categories.map((category) => (
                <li key={category._id}>
                  <input
                    checked={checkCatsAndTags(checkedCats, category._id)}
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
            style={{ maxHeight: "120px", overflowY: "scroll" }}
          >
            {tags &&
              tags.map((tag) => (
                <li key={tag._id}>
                  <input
                    checked={checkCatsAndTags(checkedTags, tag._id)}
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
    </>
  );
};

UpdateBlog.modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "video"],
    ["code-block"],
  ],
};

UpdateBlog.formats = [
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

export default withRouter(UpdateBlog);
