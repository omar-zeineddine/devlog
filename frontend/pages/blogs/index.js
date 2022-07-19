import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API } from "../../config";
import Card from "../../components/blog/Card";

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
                    <Card blog={blog} />
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
