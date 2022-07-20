import Link from "next/link";
import { API } from "../../../config";
import renderHTML from "react-render-html";
import moment from "moment";

const Card = ({ blog }) => {
  return (
    <div className="lead blog">
      <header>
        {/* use next link: clicking on blog title --> single blog view page */}
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="py-3">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className="mark ml-1 py-2">
          Written by {blog.postedBy.name} | Published{" "}
          {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section>
        {/* display categories and tags */}
        {blog.categories.map((category) => (
          <Link key={category._id} href={`/categories/${category.slug}`}>
            <a className="btn btn-primary mr-2 mt-1">{category.name}</a>
          </Link>
        ))}

        {blog.tags.map((tag) => (
          <Link key={tag._id} href={`/tags/${tag.slug}`}>
            <a className="btn btn-outline-primary mr-2 mt-1">{tag.name}</a>
          </Link>
        ))}
        <br />
      </section>

      <div className="row mt-3">
        <div className="col-xl-4">
          <img
            className="img img-fluid"
            src={`${API}/blog/photo/${blog.slug}`}
            style={{ objectFit: "cover", width: "100%" }}
            alt={blog.title}
          />
        </div>
        <div className="col-xl-8">
          <section>
            <div>{renderHTML(blog.excerpt)}</div>
            <Link href={`/blog/${blog.slug}`}>
              <a className="btn btn-primary mt-3">Read More</a>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
