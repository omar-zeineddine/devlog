import { useState } from "react";
import { emailContactForm } from "../../actions/form";

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
    sent: false,
    buttonText: "Send Message",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let sentEmail = await emailContactForm({
      authorEmail,
      name,
      email,
      message,
    });

    if (sentEmail.success) {
      setValues({
        ...values,
        sent: true,
        name: "",
        email: "",
        message: "",
        buttonText: "Message Sent",
        success: sentEmail.success,
      });
    } else {
      setValues({ ...values, error: sentEmail.error });
    }
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Send Message",
    });
  };

  const alertSuccess = () =>
    success && (
      <div className="alert alert-info">Your Message has been delivered</div>
    );

  const alertError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <div className="mb-5">
      {alertSuccess()}
      {alertError()}
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="lead">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            className="form-control"
            value={name}
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Email</label>
          <input
            type="email"
            onChange={handleChange("email")}
            className="form-control"
            value={email}
            required
          />
        </div>

        <div className="form-group">
          <label className="lead">Message</label>
          <textarea
            className="form-control"
            onChange={handleChange("message")}
            type="text"
            value={message}
            rows="8"
            required
          ></textarea>
        </div>

        <div className="text-center mb-5">
          <button type="submit" className="btn btn-primary btn-outline-gray">
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
