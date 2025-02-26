import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import TheBearer from "../../../api/TheBearer";
import photo_api from "../../../api/photoConfig";
import logo from "../../../assets/Logo.png";

function TheDashboardViewModal({ closeModal, OrderID }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [menuResponse, setMenuResponse] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await TheBearer.get("/order/all");
        const order = response.data.find((order) => order.OrderID === OrderID);
        setOrderDetails(order);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("/menu/allitems");
        setMenuResponse(response);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    if (OrderID) {
      fetchOrders();
      fetchMenuItems();
    }
  }, [OrderID]);

  const getMenuItem = (menuId) => {
    return menuResponse?.data.find((item) => item.id === menuId) ?? null;
  };

  const calculateTotalPrice = () => {
    const orderedItems = orderDetails?.OrderedItems;
    const menuItems = menuResponse?.data;
    if (!orderedItems || !menuItems) return 0;
    return orderedItems.reduce((total, item) => {
      const menuItem = menuItems.find(
        (menuItem) => menuItem.id === item.menuId
      );
      return total + (menuItem ? menuItem.price * item.Quantity : 0);
    }, 0);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-[125vh] md:h-screen bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 w-[35rem] shadow-md mx-2 overflow-x-auto">
          <div>
            <div className="flex justify-center">
              <img src={logo} alt="Cold and Spicy Logo" className="w-[25%]" />
            </div>{" "}
            <div className="flex justify-between mb-3 relative">
              <p className="text-sm mt-3 font-bold text-gray-700">
                Product Details
              </p>
              <button onClick={closeModal} title="Close">
                <IoClose className="text-2xl absolute -top-[8rem] -right-2" />
              </button>
            </div>
            {orderDetails && menuResponse && (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Item</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.OrderedItems.map((item, index) => {
                    const menuItem = getMenuItem(item.menuId);
                    const totalItemPrice = menuItem
                      ? menuItem.price * item.Quantity
                      : 0;
                    return (
                      <tr key={index} className="text-center">
                        <td className="border px-4 py-2">
                          {menuItem ? (
                            <div className="flex items-center">
                              <span title={menuItem.name}>
                                <img
                                  src={`${photo_api}/${menuItem.images.name}`}
                                  alt={menuItem.name}
                                  className="w-10 h-10 mr-2 object-cover rounded-full"
                                />
                              </span>
                              <p>{menuItem.name}</p>
                            </div>
                          ) : (
                            "Unknown Menu Item"
                          )}
                        </td>
                        <td className="border px-4 py-2">{item.Quantity}</td>
                        <td className="border px-4 py-2">
                          {menuItem ? `Rs.${menuItem.price}` : "-"}
                        </td>
                        <td className="border px-4 py-2">
                          {totalItemPrice ? `Rs.${totalItemPrice}` : "-"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            <div className="flex justify-end mt-3">
              <p className="text-sm font-bold text-gray-700">
                Total Price: Rs.{calculateTotalPrice()}
              </p>
            </div>
            <div className="flex justify-center mt-3">
              <button
                onClick={closeModal}
                type="submit"
                className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
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

export default TheDashboardViewModal;
