import { useState } from "react";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="logo">DevLog</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link href="/blogs">
                <NavLink>Blogs</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/about">
                <NavLink>About</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/signin">
                <NavLink>Signin</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/signup">
                <NavLink>Signup</NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
