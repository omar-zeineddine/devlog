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
              <section>{JSON.stringify(blog)}</section>
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
