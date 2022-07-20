import Link from "next/link";
import Layout from "../../components/Layout";
import { showBlog } from "../../actions/blog";
import { API } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

const BlogPage = ({ blog, query }) => {
  return (
    <>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row">
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                    style={{
                      width: "100%",
                      height: "60vh",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </section>
            </div>

            <div className="container">
              <section>
                <h1 className="py-3 text-center">{blog.title}</h1>
                <p className="mark ml-1 py-2">
                  Written by {blog.postedBy.name} | Published{" "}
                  {moment(blog.updatedAt).fromNow()}
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

            <div className="container mt-5">
              <h4 className="text-center">Related Blogs</h4>
              <hr />
              <p>todo: show related blogs</p>
              <p>todo: show blog comments</p>
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
      console.log("get initial props in single blog", data);
      return { blog: data, query };
    }
  });
};

export default BlogPage;
