import React, { useState, useEffect } from "react";
import axios from "axios";
import { w3cwebsocket as WebSocket } from "websocket";
import { PiDotsThreeVertical } from "react-icons/pi";
import photo_api from "../api/photoConfig";

function TheViewOrder() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [tableId, setTableId] = useState(localStorage.getItem("selectedTable"));
  const [socket, setSocket] = useState(null);
  const [openPopup, setOpenPopup] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/order/${tableId}`);
        setOrders(response.data);
        const newSocket = new WebSocket("wss://greenbytetechnology.com");
        setSocket(newSocket);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (tableId) {
      fetchOrders();
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [tableId]);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        const filteredOrders = data.filter(
          (order) => order.TableID === parseInt(tableId)
        );
        setOrders(filteredOrders);
      } else if (typeof data === "object") {
        setOrders((prevOrders) => {
          const index = prevOrders.findIndex(
            (order) => order.OrderID === data.OrderID
          );
          if (index !== -1) {
            if (data.TableID === parseInt(tableId)) {
              const updatedOrders = [...prevOrders];
              updatedOrders[index] = data;
              return updatedOrders;
            } else {
              return prevOrders;
            }
          } else {
            if (data.TableID === parseInt(tableId)) {
              return [...prevOrders, data];
            } else {
              return prevOrders;
            }
          }
        });
      } else {
        console.error("Received data is neither an array nor an object:", data);
      }
    };

    socket.onopen = function (event) {
      socket.send("New Order Came");
    };

    return () => {
      socket.onmessage = null;
      socket.onopen = null;
    };
  }, [socket, tableId]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("/menu/allitems");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  const findMenuItemById = (itemId) => {
    return menuItems.find((item) => item.id === itemId);
  };

  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return dateTime.toLocaleString("en-US", options);
  };

  const handleIconClick = (orderID) => {
    setOpenPopup((prevPopup) => (prevPopup === orderID ? null : orderID));
    setTimeout(() => {
      setOpenPopup(null);
    }, 5000);
  };

  return (
    <div className="px-[2%] md:px-[4%] lg:px-[10%]">
      <div>
        <p className="text-lg font-bold mb-3">Orders of Table {tableId}</p>
      </div>
      <div className="container mx-auto text-gray-700 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {orders && orders.length > 0 ? (
          orders
            .filter((order) => order.Status !== "PAID")
            .map((order) => (
              <div
                key={order.OrderID}
                className="shadow-custom-shadow rounded p-3 relative"
              >
                <div className="flex flex-col text-xs font-semibold gap-2">
                  <div className="flex justify-between items-center relative">
                    <p>Order ID : {order.OrderID}</p>
                    <div className="p-[0.15rem] flex justify-center items-center">
                      <PiDotsThreeVertical
                        onClick={() => handleIconClick(order.OrderID)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  {openPopup === order.OrderID && (
                    <div className="absolute top-9 right-4 border p-1 rounded-md bg-white">
                      <p className="leading-5">
                        To cancel your order, <br />
                        kindly contact our staff for assistance.
                      </p>
                    </div>
                  )}
                  <p>Table ID : {order.TableID}</p>
                  <p>Status : {order.Status}</p>
                  <p>Date-Time : {formatDateTime(order.OrderDateTime)}</p>
                  <p>Total : Rs.{order.Total}</p>
                  <p>
                    Ordered Items : {order.OrderedItems.length}{" "}
                    {order.OrderedItems.length === 1 ? "item" : "items"}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {order.OrderedItems && order.OrderedItems.length > 0 ? (
                      order.OrderedItems.map((item, index) => {
                        const menuItem = findMenuItemById(item.menuId);
                        const key = `${order.OrderID}-${index}`;
                        return (
                          <div key={key}>
                            {menuItem && (
                              <li className="flex items-center">
                                {menuItem.images && (
                                  <img
                                    src={photo_api + menuItem.images.name}
                                    alt={menuItem.name}
                                    className="w-9 h-9 mr-2 rounded-full"
                                  />
                                )}
                                {item.Quantity} x {menuItem.name}
                              </li>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <li>No ordered items</li>
                    )}
                  </ul>
                </div>
              </div>
            ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
}

export default TheViewOrder;
