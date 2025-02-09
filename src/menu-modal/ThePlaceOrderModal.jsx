import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import photo_api from "../api/photoConfig";

function ThePlaceOrderModal({ orders, onCancel }) {
  // const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const selectedTable = localStorage.getItem("selectedTable");
  const totalPrice = orders.reduce(
    (acc, order) => acc + order.price * order.quantity,
    0
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setUserLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     },
  //     (err) => {
  //       setError(err.message);
  //     }
  //   );
  // }, []);

  const placeOrder = async () => {
    try {
      // if (!userLocation) {
      //   setError(
      //     "We'd greatly appreciate it if you could share your current location with us."
      //   );
      //   return;
      // }

      // const distance = calculateDistance(
      //   userLocation.latitude,
      //   userLocation.longitude,
      //   27.7062902,
      //   85.3299475
      // );
      // if (distance > 30) {
      //   setError(
      //     "Please ensure that you are currently located within our restaurant."
      //   );
      //   return;
      // }

      const data = {
        TableID: parseInt(selectedTable),
        Total: totalPrice,
        OrderedItems: orders.map((order) => ({
          menuId: parseInt(order.id),
          Quantity: parseInt(order.quantity),
        })),
      };
      const response = await axios.post("/order/", data);
      navigate("/view-order");
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  // const calculateDistance = (lat1, lon1, lat2, lon2) => {
  //   const R = 6371e3;
  //   const φ1 = (lat1 * Math.PI) / 180;
  //   const φ2 = (lat2 * Math.PI) / 180;
  //   const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  //   const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  //   const a =
  //     Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
  //     Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //   return R * c;
  // };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[30rem] shadow-md mx-2">
        <div className="flex justify-between">
          <p className="text-xl font-bold mb-4 text-gray-700">Place Order</p>
          <IoClose
            className="text-lg font-bold cursor-pointer"
            onClick={onCancel}
            title="Close"
          />
        </div>
        {error && (
          <div>
            <p className="text-red-500 text-center mb-6">{error}</p>
            <div className="flex justify-center">
              <button
                className="border bg-gray-400 text-white hover:bg-gray-500 py-2 px-4 rounded-md text-xs"
                onClick={onCancel}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {!error && (
          <React.Fragment>
            <p className="font-bold text-gray-700 text-sm">
              Table {selectedTable}
            </p>
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
            <div className="flex justify-center items-center gap-3 mt-2">
              <button
                className="border bg-gray-400 text-white hover:bg-gray-500 py-2 px-4 rounded-md text-xs"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="primary-btn-color py-2 px-4 rounded-md text-xs"
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ThePlaceOrderModal;
