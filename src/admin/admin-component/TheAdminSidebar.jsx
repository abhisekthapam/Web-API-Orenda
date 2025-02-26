import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi"; // Logout icon
import { HiOutlineCube } from "react-icons/hi2";
import { LuContact } from "react-icons/lu";
import { RiBillLine } from "react-icons/ri";
import { TbLogout2, TbTruckDelivery } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";

function TheAdminSidebar() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <div className="sticky top-0 h-full">
      <div className="w-[124%] md:w-full flex justify-center">
        <Link to="/admin-dashboard">
          <img
            src={logo}
            alt="Cold and Spicy Logo"
            className="w-[160px] h-[90px] object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between md:h-[80vh]">
        <div>
          <ul className="flex flex-row justify-between md:flex-col gap-3 p-1 md:p-7">
            <li>
              <NavLink
                className="flex items-center gap-1 px-3 p-2 rounded-md admin"
                to="/admin-dashboard"
              >
                <AiOutlineHome className="text-xl -mt-1" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center gap-1 px-3 p-2 rounded-md admin"
                to="/admin-product"
              >
                <HiOutlineCube className="text-xl -mt-1" />
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center gap-1 px-3 p-2 rounded-md admin"
                to="/admin-user"
              >
                <LuContact className="text-xl -mt-1" />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center gap-1 px-3 p-2 rounded-md admin"
                to="/admin-order-notification"
              >
                <RiBillLine className="text-xl -mt-1" />
                Ticket
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center gap-1 px-3 p-2 rounded-md admin"
                to="/admin-order"
              >
                <TbTruckDelivery className="text-xl -mt-1" />
                Orders
              </NavLink>
            </li>
          </ul>
          <div className="px-0 md:px-6 mt-2">
            <NavLink
              className="flex items-center gap-1 px-3 p-2 mx-1 rounded-md admin"
              onClick={handleLogout}
              to=""
            >
              <TbLogout2 className="text-xl -mt-1" />
              Logout
            </NavLink>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg w-96 text-center">
            <div className="flex justify-center text-red-500 text-3xl mb-6">
              <FiLogOut />
            </div>
            <h3 className="font-bold text-[16px]">Logout Confirmation</h3>
            <p className="text-gray-600 text-xs mt-3">
              Are you sure you want to log out?
            </p>
            <div className="mt-6">
              <button
                onClick={confirmLogout}
                className="w-full bg-gradient-to-r from-black to-blue-500 text-white py-2 rounded-[4px] mb-3 font-semibold transition-colors duration-300 hover:from-blue-500 hover:to-black"
              >
                Yes, Logout
              </button>
              <button
                onClick={cancelLogout}
                className="w-full bg-gray-200 text-black py-2 rounded-[4px] font-semibold transition-colors duration-300 hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Need help?{" "}
              <span className="text-blue-500 cursor-pointer">
                Contact support
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TheAdminSidebar;
