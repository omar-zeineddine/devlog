import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie, isAuthenticated } from "../../../actions/auth";
import { showAllBlogs, removeBlog } from "../../../actions/blog";
import moment from "moment";
import Swal from "sweetalert2";

const ReadBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState();
  const token = getCookie("token");

  const loadBlogs = async () => {
    let blogs;
    try {
      blogs = await showAllBlogs(username);
      if (blogs) {
        setBlogs(blogs);
      }
    } catch (error) {
      console.log(blogs.error);
    }
  };

  useEffect(() => {
    loadBlogs();
    // console.log("MESSAGE:", message);
  }, []);

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        loadBlogs();
      }
    });
  };

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure you want to delete this blog?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
        deleteBlog(slug);
      }
    });
  };

  return (
    <div>
      {message && <div className="alert alert-warning">{message}</div>}

      {blogs.map((blog) => (
        <div className="card m-4 pt-3 text-center" key={blog._id}>
          <div className="card-body">
            <h5>{blog.title}</h5>
            <p>Posted by {blog.postedBy.name}</p>
            <p>Published on {moment(blog.updatedAt).fromNow()}</p>

            {/* <button className="btn btn-info btn-sm card-link">Update</button> */}
            {isAuthenticated() && isAuthenticated().role === 1 ? (
              <Link href={`/admin/crud/${blog.slug}`}>
                <a className="btn btn-outline-gray btn-sm card-link">Update</a>
              </Link>
            ) : (
              <Link href={`/user/crud/${blog.slug}`}>
                <a className="btn btn-outline-gray btn-sm card-link">Update</a>
              </Link>
            )}
            <button
              onClick={() => confirmDelete(blog.slug)}
              className="btn btn-danger btn-sm card-link"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadBlogs;
