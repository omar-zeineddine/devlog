function Navbar() {
  return (
    <div className="nav">
      <div className="navLeft">
        <div className="logo">DevLog</div>
      </div>
      <div className="navCenter">
        <ul className="NavList">
          <li className="NavListItem">Home</li>
          <li className="NavListItem">About</li>
          <li className="NavListItem">Contact</li>
          <li className="NavListItem">Write</li>
          <li className="NavListItem">Logout</li>
        </ul>
      </div>
      <div className="navRight">
        <li className="NavListItem">Signin</li>
        <li className="NavListItem">Register</li>
      </div>
    </div>
  );
}

export default Navbar;
