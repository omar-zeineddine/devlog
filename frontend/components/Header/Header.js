import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuthenticated, logout } from "../../actions/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import NProgress from "nprogress";
import styles from "./Header.module.scss";

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteChangeComplete = (url) => NProgress.done();
Router.onRouteChangeError = (url) => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className={`${styles.nav}`} expand="sm" dark>
        <div className="container">
          <NavbarBrand href="/" className={styles.logo}>
            Devlog
          </NavbarBrand>
          <NavbarToggler className={styles.tog} onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className={styles.navItem}>
                <Link href="/blogs">
                  <NavLink className={styles.navLink}>Blogs</NavLink>
                </Link>
              </NavItem>
              <NavItem className={styles.navItem}>
                <Link href="/about">
                  <NavLink className={styles.navLink}>About</NavLink>
                </Link>
              </NavItem>
              <NavItem className={styles.navItem}>
                <Link href="/contact">
                  <NavLink className={styles.navLink}>Contact</NavLink>
                </Link>
              </NavItem>
              {isAuthenticated() ? (
                <>
                  {isAuthenticated().role === 1 ? (
                    <NavItem className={styles.navItem}>
                      <Link href="/admin">
                        <NavLink className={styles.navLink}>{`${
                          isAuthenticated().name
                        }'s Dashboard`}</NavLink>
                      </Link>
                    </NavItem>
                  ) : (
                    <NavItem className={styles.navItem}>
                      <Link href="/user">
                        <NavLink className={styles.navLink}>{`${
                          isAuthenticated().name
                        }'s Dashboard`}</NavLink>
                      </Link>
                    </NavItem>
                  )}
                  <NavItem className={styles.navItem}>
                    <Link href="/signin">
                      <NavLink
                        className={styles.navLink}
                        onClick={() => logout(() => Router.replace("/signin"))}
                      >
                        Logout
                      </NavLink>
                    </Link>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem className={styles.navItem}>
                    <Link href="/signin">
                      <NavLink className={styles.navLink}>Signin</NavLink>
                    </Link>
                  </NavItem>
                  <NavItem className={styles.navItem}>
                    <Link href="/signup">
                      <NavLink className={styles.signupBtn}>Signup</NavLink>
                    </Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
