import React from "react";
import "../CSS/navbar.css";
import { Link } from "react-router-dom";
interface NavbarProps {
  // No need for the links prop here
}

const Navbar: React.FC<NavbarProps> = () => {
  const links = [
    { title: "Home", url: "/" },
    { title: "Register", url: "/register" },
  ];

  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <div className="Logo">
            <img
              src="https://static.wixstatic.com/media/202854_570469b58fc34ebb8dc8f7f2f8f127b5~mv2.png/v1/fill/w_365,h_83,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logos-1.png"
              alt="Astro Bharat Logo"
            />
          </div>
        </Link>

        <div className="links">
          {links.map((e, index) => {
            return (
              <div key={index}>
                <Link to={e.url}>
                  <button>{e.title}</button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
