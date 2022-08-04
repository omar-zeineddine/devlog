import Link from "next/link";
import { API } from "../../../config";
import styles from "./RelatedBlogCard.module.scss";

const RelatedBlogCard = ({ blog }) => {
  return (
    <div className={`${styles.RelatedBlogCard} container p-0 m-0 card my-3`}>
      <Link href={`/blogs/${blog.slug}`}>
        <a>
          <img
            className={`${styles.RelatedBlogCardImg} `}
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
