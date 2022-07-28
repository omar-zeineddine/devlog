import { getCategory } from "../../actions/category";
import Layout from "../../components/Layout";
import Card from "../../components/blog/Card/Card";

const Category = ({ category, blogs }) => {
  return (
    <>
      <Layout>
        <main>
          <div className="container text-center">
            <header>
              <h1 className="display-4 font-weight-bold py-5">
                {category.name}
              </h1>
            </header>
          </div>

          <div className="col-xl-12">
            {blogs.map((blog, idx) => (
              <div>
                <Card key={idx} blog={blog} />
                <hr />
              </div>
            ))}
          </div>
        </main>
      </Layout>
    </>
  );
};

Category.getInitialProps = async ({ query }) => {
  // get category and its associated blogs
  const data = await getCategory(query.slug);

  try {
    if (data) {
      return { category: data.category, blogs: data.blogs };
    }
  } catch (error) {
    console.error(error);
  }
};

export default Category;
