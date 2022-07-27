import Link from "next/link";
import Layout from "../../components/Layout";
import { API } from "../../config";
import { useState, useEffect } from "react";
import { showBlog, showRelatedBlogs } from "../../actions/blog";
import renderHTML from "react-render-html";
import moment from "moment";
import RelatedBlogCard from "../../components/blog/RelatedBlogCard/RelatedBlogCard";
import DisqusThread from "../../components/comment/DisqusThread";

const BlogPage = ({ blog, query }) => {
  // states
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const loadRelatedBlogs = () => {
    showRelatedBlogs(blog).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRelatedBlogs(data);
      }
    });
  };

  useEffect(() => {
    loadRelatedBlogs();
  }, []);

  return (
    <>
      <Layout>
        <main>
          <article>
            <div>
              <section>
                <div>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid px-0"
                    style={{
                      width: "100%",
                      height: "60vh",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </section>
            </div>

            <div>
              <section>
                <h1 className="py-3 text-left">{blog.title}</h1>
                <p className="bg-gray ml-1 py-2 px-0 d-inline-block">
                  Written by{" "}
                  <Link href={`/profile/${blog.postedBy.username}`}>
                    <a>{blog.postedBy.name}</a>
                  </Link>{" "}
                  | Published {moment(blog.updatedAt).fromNow()}
                </p>
              </section>
              <section className="mb-3">
                {blog.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                  >
                    <a className="btn btn-primary mr-2 mt-1">{category.name}</a>
                  </Link>
                ))}

                {blog.tags.map((tag) => (
                  <Link key={tag._id} href={`/tags/${tag.slug}`}>
                    <a className="btn btn-outline-primary mr-2 mt-1">
                      {tag.name}
                    </a>
                  </Link>
                ))}
                <br />
              </section>
              <section>
                <div className="row">
                  <div className="col-xl-12">{renderHTML(blog.body)}</div>
                </div>
              </section>
            </div>

            <div className=" mt-5">
              <h4 className="text-left">Related Blogs</h4>
              <hr />
              <div className="row">
                {relatedBlogs.map((blog) => (
                  <div className="col-md-4" key={blog._id}>
                    <RelatedBlogCard blog={blog} />
                  </div>
                ))}
              </div>
              {/* disqus comments */}
              <div className="mt-5">
                <DisqusThread
                  id={blog._id}
                  title={blog.title}
                  path={`/blog/${blog.slug}`}
                />
              </div>
            </div>
          </article>
        </main>
      </Layout>
    </>
  );
};

BlogPage.getInitialProps = ({ query }) => {
  return showBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // console.log("get initial props in single blog", data);
      return { blog: data, query };
    }
  });
};

export default BlogPage;
