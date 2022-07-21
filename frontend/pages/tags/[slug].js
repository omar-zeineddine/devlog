import { getTag } from "../../actions/tag";
import Layout from "../../components/Layout";
import Card from "../../components/blog/Card/Card";

const Tag = ({ tag, blogs }) => {
  return (
    <>
      <Layout>
        <main>
          <div className="container text-center">
            <header>
              <div className="col-xl-12">
                <h1 className="display-4 font-weight-bold py-5">{tag.name}</h1>
                {blogs.map((blog, idx) => (
                  <div>
                    <Card key={idx} blog={blog} />
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  );
};

Tag.getInitialProps = async ({ query }) => {
  // get tag and its associated blogs
  const data = await getTag(query.slug);

  try {
    if (data) {
      return { tag: data.tag, blogs: data.blogs };
    }
  } catch (error) {
    console.error(error);
  }
};

export default Tag;
