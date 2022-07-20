import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../../actions/auth";
import { getCategories } from "../../../actions/category";
import { getTags } from "../../../actions/tag";
import { showBlog, updateBlog } from "../../../actions/blog";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateBlog = ({ router }) => {
  const [body, setBody] = useState("");
  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    title: "",
    body: "",
  });

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
  }, [router]);

  const { error, success, formData, title } = values;
  const { slug } = router.query;

  const initBlog = async () => {
    let blog;
    try {
      blog = await showBlog(slug);
      if (blog) {
        setValues({ ...values, title: blog.title });
        setBody(blog.body);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    // form data to be processed by the backend to create a new blog
    formData.set(name, value);
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (event) => {
    setBody(event);
    // whenever a user is making a change, that change will be save into 'formData.body'
    formData.set("body", event);
  };

  const editBlog = () => {
    console.log("edit blog");
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
              placeholder="Write something amazing..."
              onChange={handleBody}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update Blog
          </button>
        </form>
      </div>
      <div className="col-xl-4">
        <div className="form-group pb-3">
          <h5 className="mb-3">Featured Image</h5>

          <label className="btn btn-outline-info">
            Upload Image
            <input type="file" accept="image/*" hidden />
          </label>
          <small className="text-muted ml-2">Max Size: 1MB</small>
        </div>
        <div>
          <h5>Categories</h5>
          <ul
            className="list-unstyled"
            style={{ maxHeight: "120px", overflowY: "scroll" }}
          ></ul>

          <hr />
          <h5>Tags</h5>
          <ul
            className="list-unstyled"
            style={{ maxHeight: "120px", overflowY: "scroll" }}
          ></ul>
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
