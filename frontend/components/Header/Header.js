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
            {/* hide signup and sign items when a user is logged in */}
            {!isAuthenticated() && (
              <>
                <NavItem className={styles.navitem}>
                  <Link href="/signin">
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem className={styles.navitem}>
                  <Link href="/signup">
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {/* show logout item only when the user is logged in */}
            {isAuthenticated() && (
              <NavItem className={styles.navitem}>
                <NavLink
                  onClick={() => logout(() => Router.replace("/signin"))}
                >
                  logout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
