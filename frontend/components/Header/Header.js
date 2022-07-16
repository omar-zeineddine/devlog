import { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuthenticated, logout } from "../../actions/auth";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import styles from "./Header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className={styles.nav} dark expand="sm">
        <Link href="/">
          <NavLink className={styles.logo}>DevLog</NavLink>
        </Link>
        <NavbarToggler className={styles.tog} onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem className={styles.navitem}>
              <Link href="/blogs">
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>
            <NavItem className={styles.navitem}>
              <Link href="/about">
                <NavLink>About</NavLink>
              </Link>
            </NavItem>
            {isAuthenticated() ? (
              <>
                {isAuthenticated().role === 1 ? (
                  <NavItem className={styles.navitem}>
                    <Link href="/admin">
                      <NavLink>{`${
                        isAuthenticated().name
                      }'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                ) : (
                  <NavItem className={styles.navitem}>
                    <Link href="/user">
                      <NavLink>{`${
                        isAuthenticated().name
                      }'s Dashboard`}</NavLink>
                    </Link>
                  </NavItem>
                )}
                <NavItem className={styles.navitem}>
                  <Link href="/signin">
                    <NavLink
                      onClick={() => logout(() => Router.replace("/signin"))}
                    >
                      Logout
                    </NavLink>
                  </Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem className={styles.navitem}>
                  <Link href="/signin">
                    <NavLink>SignIn</NavLink>
                  </Link>
                </NavItem>
                <NavItem className={styles.navitem}>
                  <Link href="/signup">
                    <NavLink>SignUp</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
