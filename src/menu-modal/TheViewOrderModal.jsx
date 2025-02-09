import React from "react";
import { IoClose } from "react-icons/io5";
import photo_api from "../api/photoConfig";

function TheViewOrderModal({ orders, onClose }) {
  const selectedTable = localStorage.getItem("selectedTable");
  const totalPrice = orders.reduce((acc, order) => acc + order.price, 0);

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[30rem] shadow-md mx-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold mb-4 text-gray-700">Order Details</p>
          <IoClose
            className="text-lg font-bold cursor-pointer"
            onClick={onClose}
            title="Close"
          />
        </div>
        <p className="font-bold text-gray-700 text-sm">Table {selectedTable}</p>
        {orders.length === 0 ? (
          <p className="text-gray-700 mb-6 text-sm">No items selected</p>
        ) : (
          <div>
            <div className="flex gap-7">
              <p className="mb-4 text-gray-700 text-sm font-semibold">
                Number of Items: {orders.length}
              </p>
              <p className="text-gray-700 text-sm font-semibold">
                Total Price: Rs.{totalPrice}
              </p>
            </div>
            <div className="h-[35vh] custom-scroll">
              {orders.map((order, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <img
                    src={photo_api + order.image}
                    alt={order.name}
                    className="w-12 h-12 mr-4 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs text-gray-700">
                      {order.name} - Quantity: {order.quantity}
                    </p>
                    <p className="text-gray-600 text-xs">
                      Price: Rs.{order.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex justify-center mt-2">
          <button
            className="primary-btn-color py-2 px-4 rounded text-xs"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default TheViewOrderModal;
