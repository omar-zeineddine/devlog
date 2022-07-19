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
        <div className="container-fluid">
          <header>
            <div className="col-md-12 py-3">
              <h1 className="display-4a font-weight-bold text-center">
                Cloud Related Blogs
              </h1>
            </div>
            <section>
              <p>Categories & Tags</p>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">{JSON.stringify(blogs)}</div>
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
