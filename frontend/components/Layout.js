import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Header/Header"), { ssr: false });

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
    </div>
  );
};

export default Layout;
