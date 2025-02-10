import React from "react";
import { Link } from "react-router-dom";

function TheError() {
  return (
    <div className="text-gray-700">
      <p className="text-center font-bold text-[10rem] primary-color">404</p>
      <p className="error-heading text-[2rem] text-center mb-3">
        Oops! Page Not Found
      </p>
      <div className="flex justify-center">
        <div className="flex px-3 w-full md:w-[35%]">
          <div className="w-full text-xs leading-7">
            <p className="font-bold">
              It seems you've ventured into uncharted territory. Don't worry,
              let's guide you back to our wonderful world of discovery.
            </p>
            <div className="flex flex-col items-start primary-color md:pl-2">
              <Link to="/">
                <button>@Home</button>
              </Link>
              <Link to="/menu">
                <button>@Menu</button>
              </Link>
              <Link to="/contact-us">
                <button>@Contact</button>
              </Link>
            </div>
          </div>
          <div className="w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default TheError;
