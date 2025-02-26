import React from "react";
import { FaCircle } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import photo_api from "../../../api/photoConfig";
import logo from "../../../assets/Logo.png";

function TheProductViewModal({ productDetails, closeModal }) {
  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 w-[35rem] shadow-md mx-2">
          <div>
            <div className="flex justify-center">
              <img src={logo} alt="Cold and Spicy Logo" className="w-[25%]" />
            </div>{" "}
            <div className="flex justify-between mb-3 relative">
              <p className="text-xl font-bold text-gray-700">Product Details</p>
              <button onClick={closeModal} title="Close">
                <IoClose className="text-2xl absolute -top-[8rem] -right-2" />
              </button>
            </div>
            <div className="flex">
              <div className="w-full">
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">
                    Product Id:
                  </p>
                  <p className="text-xs">{productDetails.id}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">
                    Product Name:
                  </p>
                  <p className="text-xs">{productDetails.name}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">
                    Product Price:
                  </p>
                  <p className="text-xs">Rs.{productDetails.price}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">
                    Product Status:
                  </p>
                  <p className="text-xs flex items-center gap-1">
                    {productDetails.isAvilable ? (
                      <FaCircle className="text-green-600 text-[8px]" />
                    ) : (
                      <FaCircle className="text-amber-600 text-[8px]" />
                    )}
                    {productDetails.isAvilable ? "Available" : "Not Available"}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-center items-center object-contain">
                <img
                  src={photo_api + productDetails.images.name}
                  className="h-[230px]"
                />
              </div>
            </div>
            <div className="flex justify-center mt-3">
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

export default TheProductViewModal;
