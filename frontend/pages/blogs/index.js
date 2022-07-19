import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

// grab properties that are returned from initial props
const BlogsPage = ({ blogs, categories, tags, size }) => {
  return (
    <Layout>
      <main>
        <header>
          <div className="container-fluid">
            <div className="col-xl-12 pt-3">
              <h1 className="display-5 font-weight-bold text-center">Blogs</h1>
            </div>
          </div>
        </header>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              {/* loop over blogs and index*/}
              {blogs &&
                blogs.map((blog, idx) => (
                  // output each blog as an article, having a unique key passed as idx
                  <article key={idx} className="mb-4">
                    <div className="lead">
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
                        <p>show categories and tags</p>
                      </section>

                      <div className="row">
                        <div className="col-xl-4">
                          {/* todo: add image */}
                          Image
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
                    <hr />
                  </article>
                ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

// to use get initial props (SSR - page)

// get initial props can be used only on pages not components
BlogsPage.getInitialProps = () => {
  // make request to backend, get data
  return listBlogsWithCategoriesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // necessary to return data to SSR page
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};

export default BlogsPage;
