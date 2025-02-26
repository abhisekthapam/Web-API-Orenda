import React from "react";
import { IoClose } from "react-icons/io5";
import logo from "../../../assets/Logo.png";

function TheUserViewModal({ userDetails, closeModal }) {
  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 w-[35rem] shadow-md mx-2">
          <div>
            <div className="flex justify-center">
              <img src={logo} alt="Cold and Spicy Logo" className="w-[25%]" />
            </div>{" "}
            <div className="flex justify-between mb-3 relative">
              <p className="text-xl font-bold text-gray-700">User Details</p>
              <button onClick={closeModal} title="Close">
                <IoClose className="text-2xl absolute -top-[8rem] -right-2" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Name:</p>
              <p className="text-xs">{userDetails.name}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Role:</p>
              <p className="text-xs">{userDetails.role}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Phone Number:</p>
              <p className="text-xs">{userDetails.phone}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Email:</p>
              <p className="text-xs">{userDetails.email}</p>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheUserViewModal;
