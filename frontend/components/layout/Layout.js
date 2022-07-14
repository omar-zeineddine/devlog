import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <p>footer</p>
    </div>
  );
};

export default Layout;
