import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

const NavigationLinks = () => (
  <ul className="flex justify-around">
    <li>
      <NavLink to="/">
        <span className="stylish-border">Home</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/menu">
        <span className="stylish-border">Menu</span>
      </NavLink>
    </li>
    <li>
      <NavLink to="/contact-us">
        <span className="stylish-border">Contact</span>
      </NavLink>
    </li>
    <li className="hidden md:block">
      <NavLink to="/gallery">
        <span className="stylish-border">Gallery</span>
      </NavLink>
    </li>
    <li className="hidden md:block">
      <NavLink to="/feedback">
        <span className="stylish-border">Feedback</span>
      </NavLink>
    </li>
  </ul>
);

const TheNavbar = () => {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const closeBurger = () => {
    setIsBurgerOpen(false);
  };

  return (
    <div>
      <div className="hidden md:flex items-center justify-between">
        <div className="w-[30%] flex justify-center">
          <Link to="/">
            <img
              src={logo}
              alt="Cold and Spicy Logo"
              className="w-[110px] h-[65px] object-cover"
            />
          </Link>
        </div>
        <div className="md:w-2/5">
          <NavigationLinks />
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="flex gap-4">
            <NavLink to="/login">
              <span className="stylish-border">Login</span>
            </NavLink>
            <NavLink to="/view-order">
              <span className="stylish-border">View Order</span>
            </NavLink>
          </div>
        </div>
      </div>

      <div className="md:hidden flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex justify-center px-1">
            <Link to="/">
              <img
                src={logo}
                alt="Cold and Spicy Logo"
                className="w-[200px] h-[85px] object-contain"
              />
            </Link>
          </div>
          <div className="w-[100%]">
            {isBurgerOpen ? (
              <div className="flex justify-around p-4 w-full shadow-custom-shadow">
                <NavLink to="/login" onClick={closeBurger}>
                  <span className="stylish-border">Login</span>
                </NavLink>
                <NavLink to="/view-order" onClick={closeBurger}>
                  <span className="stylish-border">View Order</span>
                </NavLink>
              </div>
            ) : (
              <NavigationLinks />
            )}
          </div>
        </div>
        <div className="flex items-center justify-center w-1/6">
          <button>
            <span onClick={toggleBurger} className="text-lg">
              {isBurgerOpen ? "X" : "☰"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheNavbar;
