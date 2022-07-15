import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <p>footer</p>
    </div>
  );
};

export default Layout;
