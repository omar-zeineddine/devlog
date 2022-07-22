import Link from "next/link";
import { API } from "../../../config";

const RelatedBlogCard = ({ blog }) => {
  return (
    <div className="container card my-3">
      <Link href={`/blogs/${blog.slug}`}>
        <a>
          <img
            className="img fluid"
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
          />{" "}
        </a>
      </Link>
      <div className="card-body">
        <Link href={`/blogs/${blog.slug}`}>
          <a className="card-title">{blog.title}</a>
        </Link>
        <p className="text-muted">
          Posted by{" "}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.name}</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RelatedBlogCard;
