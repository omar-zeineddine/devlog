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
              <div className="col-xl-12">
                <h1 className="display-4 font-weight-bold py-5">
                  {category.name}
                </h1>
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
