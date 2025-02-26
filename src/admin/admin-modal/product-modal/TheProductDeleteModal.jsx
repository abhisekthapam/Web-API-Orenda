import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import photo_api from "../../../api/photoConfig";
import TheBearer from "../../../api/TheBearer";
import logo from "../../../assets/Logo.png";

function TheProductDeleteModal({ productId, onCancel, handleDelete }) {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/menu/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleDeleteProduct = async () => {
    try {
      await TheBearer.delete(`/menu/${productId}`);
      handleDelete(productId);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      onCancel();
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[35rem] shadow-md mx-2">
        <div>
          <div className="flex justify-center">
            <img src={logo} alt="Cold and Spicy Logo" className="w-[25%]" />
          </div>
          <div className="flex justify-between mb-3 relative">
            <p className="text-xl font-bold text-red-500">Delete Product</p>
            <button onClick={onCancel} title="Close">
              <IoClose className="text-2xl absolute -top-12 -right-2" />
            </button>
          </div>
        </div>
        {productData ? (
          <div className="text-xs text-gray-700">
            <p className="text-red-500 font-semibold">
              Are you sure you want to delete the product?
            </p>
            <div className="flex gap-3">
              <div className="w-full">
                <ul className="mt-4 flex flex-col gap-5">
                  <li>
                    <strong>Product ID:</strong> {productData.id}
                  </li>
                  <li>
                    <strong>Product Name:</strong> {productData.name}
                  </li>
                  <li>
                    <strong>Price:</strong> Rs.{productData.price}
                  </li>
                  <li className="flex items-center gap-1">
                    <strong>Status:</strong>{" "}
                    <p className="text-xs flex items-center gap-1">
                      {productData.isAvilable ? (
                        <FaCircle className="text-green-600 text-[8px]" />
                      ) : (
                        <FaCircle className="text-amber-600 text-[8px]" />
                      )}
                      {productData.isAvilable ? "Available" : "Not Available"}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="w-full flex justify-center items-center object-contain">
                <img
                  src={photo_api + productData.images.name}
                  className="h-[150px]"
                />
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p>Loading product data...</p>
        )}
      </div>
    </div>
  );
}

export default TheProductDeleteModal;
