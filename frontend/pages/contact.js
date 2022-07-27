import Layout from "../components/Layout";
import ContactForm from "../components/form/ContactForm";

const Contact = () => (
  <Layout>
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2 className="mt-5 mb-4">Contact</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  </Layout>
);

export default Contact;
