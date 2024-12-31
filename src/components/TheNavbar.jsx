import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import TheSmallScreenNavbar from "../small-screen/components/TheSmallScreenNavbar";

const TheNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
    document.body.classList[!isMobileMenuOpen ? "add" : "remove"](
      "overflow-hidden"
    );
  };

  return (
    <nav>
      <div className="hidden lg:block">
        <div className="border border-black flex">
          <div className="border border-red-500 w-1/4"></div>
          <div className="w-full">
            <div className="container mx-auto flex justify-between items-center h-[10vh]">
              <div className="hidden md:flex gap-20">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/menu">Menu</NavLink>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMobileMenu} className="focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="border border-red-500 w-1/4"></div>
        </div>

        <div
          className={`fixed inset-0 navbar bg-opacity-90 backdrop-blur-md transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden z-50 flex flex-col items-start pt-16 pl-[10%]`}
        >
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-10 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <NavLink
            to="/"
            onClick={toggleMobileMenu}
            className="py-3 text-lg hover:text-gray-300"
          >
            Home
          </NavLink>
          <NavLink
            to="/projects"
            onClick={toggleMobileMenu}
            className="py-3 text-lg hover:text-gray-300"
          >
            Menu
          </NavLink>
        </div>
      </div>
      <div className="lg:hidden">
        <TheSmallScreenNavbar />
      </div>
    </nav>
  );
};

export default TheNavbar;
