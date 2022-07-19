import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API } from "../../config";

const BlogsPage = () => {
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
            <div className="col-md-12">show all Blogs</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

// to use get initial props (SSR - page)

export default BlogsPage;
