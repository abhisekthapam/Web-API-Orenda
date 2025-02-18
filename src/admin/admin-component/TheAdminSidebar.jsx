import React from "react";
import logo from "../../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { LuContact } from "react-icons/lu";
import { HiOutlineCube } from "react-icons/hi2";
import { RiBillLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

function TheAdminSidebar() {
  const removeToken = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="sticky top-0">
      <div className="w-[124%] md:w-full flex justify-center">
        <Link to="/">
          <button onClick={removeToken}>
            <img
              src={logo}
              alt="Cold and Spicy Logo"
              className="w-[150px] h-[60px] object-contain"
            />
          </button>
        </Link>{" "}
      </div>
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
            {" "}
            <NavLink
              className="flex items-center gap-1 px-3 p-2 rounded-md admin"
              to="/admin-user"
            >
              <LuContact className="text-xl -mt-1" />
              Users
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              className="flex items-center gap-1 px-3 p-2 rounded-md admin"
              to="/admin-order-notification"
            >
              <RiBillLine className="text-xl -mt-1" />
              Ticket
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink
              className="flex items-center gap-1 px-3 p-2 rounded-md admin"
              to="/admin-order"
            >
              <TbTruckDelivery className="text-xl -mt-1" />
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TheAdminSidebar;
