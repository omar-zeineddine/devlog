import { useEffect, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuthenticated, getCookie } from "../../../actions/auth";
import { createTag, getTags, deleteTag } from "../../../actions/tag";
import Swal from "sweetalert2";

const Tag = () => {
  const [values, setValues] = useState({
    name: "",
    error: false,
    success: false,
    tags: [],
    removed: false,
    reload: false,
  });

  const { name, error, success, tags, removed, reload } = values;
  const token = getCookie("token");

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({ ...values, tags: data });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTag({ name }, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
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

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: "",
    });
  };

  // swol alert confirmation
  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure you want to delete this tag?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Tag deleted.", "success");
        removeTag(slug);
      }
    });
  };

  const removeTag = (slug) => {
    // console.log('delete', slug);
    deleteTag(slug, token).then((data) => {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inputName">Tag Name</label>
          <input
            onChange={handleChange}
            value={name}
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter tag name"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Tag
        </button>
      </form>
      <div className="mt-4">
        {tags.map((tag) => (
          <button
            onDoubleClick={() => confirmDelete(tag.slug)}
            title="Double click to delete"
            key={tag._id}
            type="button"
            className="btn btn-outline-primary mr-1 mt-2"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            {tag.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default Tag;
