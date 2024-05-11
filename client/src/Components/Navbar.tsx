import React from "react";
import "../CSS/navbar.css"
interface NavbarProps {
  // No need for the links prop here
}

const Navbar: React.FC<NavbarProps> = () => {
  const links = [
    { title: "Home", url: "/" },
    { title: "Register", url: "/register" },
  ];

  return (
    <nav className="navbar">
      {links.map((link, index) => (
        <a key={index} href={link.url}>
          {link.title}
        </a>
      ))}
    </nav>
  );
};

export default Navbar;
