import Link from "next/link";
import { API } from "../../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import styles from "./Card.module.scss";

const Card = ({ blog }) => {
  return (
    <div className="lead blog">
      <header>
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <h2 className="py-3">{blog.title}</h2>
          </a>
        </Link>
      </header>
      <section>
        <p className={`bg-gray d-inline-block `}>
          Written by{" "}
          <Link href={`/profile/${blog.postedBy.username}`}>
            <a>{blog.postedBy.name}</a>
          </Link>{" "}
          | Published {moment(blog.updatedAt).fromNow()}
        </p>
      </section>
      <section className="py-4">
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
            <div>
              {renderHTML(blog.excerpt)}
              <Link href={`/blogs/${blog.slug}`}>
                <div className="row justify-content-center">
                  <a type="submit" className="btn btn-primary">
                    Read More
                  </a>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
