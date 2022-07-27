import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => (
  <Layout>
    <article className="overflow-hidden py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center py-5">
            <h1 className="display-5 font-weight-bold">
              webdev and cloud blogs
            </h1>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center pt-4 pb-5">
            <p className="lead">
              practical web development and cloud related blogs
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="flip">
              <div
                className="front"
                style={{
                  backgroundImage:
                    "url(" + "https://i.imgur.com/u6YtqLj.gif" + ")",
                }}
              >
                <h3 className="text-center h1">MERN</h3>
              </div>
              <div className="back text-center">
                <Link href="/categories/mern">
                  <a>
                    <h4 className="h1">MERN</h4>
                  </a>
                </Link>
                <p className="lead">
                  A free and open-source JavaScript software stack for building
                  dynamic web sites and web applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </Layout>
);

export default Index;
