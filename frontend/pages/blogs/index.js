import Link from "next/link";
import Layout from "../../components/Layout";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API } from "../../config";
import Card from "../../components/blog/Card/Card";
import Search from "../../components/blog/Search/Search";
import styles from "./blogs.module.scss";
import Footer from "../../components/Footer/Footer";

// grab properties that are returned from initial props
const BlogsPage = (props) => {
  // destructure props
  const { blogs, categories, tags, totalBlogs, blogsLimit, blogsSkip, router } =
    props;

  // states
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  // load more blogs function
  const loadMoreBlogs = () => {
    let blogsToSkip = limit + skip;

    // merge blogs to existing ones
    listBlogsWithCategoriesAndTags(blogsToSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(blogsToSkip);
      }
    });
  };

  return (
    <Layout>
      <main>
        <header>
          <div>
            <div className="col-xl-12 pt-3">
              <h1 className="display-5 font-weight-bold text-center">
                Recent Blogs
              </h1>

              <section className="text-center">
                {/* loop through all categories and return as link */}
                {categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/categories/${category.slug}`}
                  >
                    <a className="btn btn-primary mr-2 mt-1">
                      <img
                        className={styles.tagIcon}
                        src="assets/icons/category.svg"
                        alt="tag icon"
                      />
                      {category.name}
                    </a>
                  </Link>
                ))}
                {tags.map((tag) => (
                  <Link key={tag._id} href={`/tags/${tag.slug}`}>
                    <a className="btn btn-outline-primary mr-2 mt-1">
                      <img
                        className={styles.tagIcon}
                        src="assets/icons/tag.svg"
                        alt="tag icon"
                      />
                      {tag.name}
                    </a>
                  </Link>
                ))}
              </section>
            </div>
          </div>
          <Search />
        </header>

        <div>
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
        <div>
          <div className="row">
            <div className="col-xl-12">
              {loadedBlogs &&
                loadedBlogs.map((blog, idx) => (
                  <article key={idx} className="mb-4">
                    <Card blog={blog} />
                    <hr />
                  </article>
                ))}
            </div>
          </div>
        </div>
        <div>
          {/* if size greater than 0 and size is greater than or equal to limit, show button */}
          {size > 0 && size >= limit && (
            <div className="row">
              <div className="col-xl-12 text-center">
                <button
                  onClick={loadMoreBlogs}
                  className="btn btn-dark infiniteScroll"
                >
                  Load More
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </Layout>
  );
};

// get initial props can be used only on pages not components
BlogsPage.getInitialProps = () => {
  let skip = 0;
  let limit = 1;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        /* size: data.size, */
        totalBlogs: data.size,
        blogsLimit: limit,
        blogsSkip: skip,
      };
    }
  });
};
export default BlogsPage;
