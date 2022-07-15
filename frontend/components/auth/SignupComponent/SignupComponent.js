import { useState } from "react";
const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "user",
    email: "user@user.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  // destructure values from state
  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("handle submit");
    console.table({ name, email, password, error, loading, message, showForm });
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <input
            value={email}
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>

        <div>
          <button className="btn btn-primary">signup</button>
        </div>
      </form>
    );
  };

  return <>{signupForm()}</>;
};

export default SignupComponent;
