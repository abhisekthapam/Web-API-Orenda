import React, { useEffect, useState } from "react";
import { w3cwebsocket as WebSocket } from "websocket";
import axios from "axios";
import QRCode from "react-qr-code";
import { IoClose } from "react-icons/io5";
import { ImQrcode } from "react-icons/im";
import logo from "../../assets/Logo.png";
import TheBearer from "../../api/TheBearer";
import photo_api from "../../api/photoConfig";

const OrderStatus = {
  ORDERED: "ORDERED",
  PROCRESSING: "PROCRESSING",
  DELIVERED: "DELIVERED",
  PAID: "PAID",
  CANCEL_CONFIRMED: "CANCEL_CONFIRMED",
};

const statusDisplayText = {
  ORDERED: "Ordered",
  PROCRESSING: "Confirmed",
  DELIVERED: "Delivered",
  PAID: "Paid",
  CANCEL_CONFIRMED: "Cancel",
};

function TheAdminOrderNotification() {
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [currentSelectedStatus, setCurrentSelectedStatus] = useState({});
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQRData] = useState({});
  const [showPaidModal, setShowPaidModal] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("wss://greenbytetechnology.com");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (typeof data === "object") {
        setOrders((prevOrders) => {
          const index = prevOrders.findIndex(
            (order) => order.OrderID === data.OrderID
          );
          if (index !== -1) {
            const updatedOrders = [...prevOrders];
            updatedOrders[index] = data;
            return updatedOrders;
          } else {
            return [...prevOrders, data];
          }
        });
      } else {
        console.error("Received data is neither an array nor an object:", data);
      }
    };
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await TheBearer.get("order/all");
        setOrders(response.data);
        const initialStatus = {};
        response.data.forEach((order) => {
          initialStatus[order.OrderID] = order.Status;
        });
        setSelectedStatus(initialStatus);
        setCurrentSelectedStatus(initialStatus);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

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

  const handleStatusChange = (orderId, newStatus) => {
    setCurrentSelectedStatus({
      ...currentSelectedStatus,
      [orderId]: newStatus,
    });
  };

  const handleSaveStatus = async () => {
    if (selectedOrderId && currentSelectedStatus[selectedOrderId]) {
      if (currentSelectedStatus[selectedOrderId] === OrderStatus.PAID) {
        setShowPaidModal(true);
        return;
      }

      try {
        await TheBearer.put(`/order/${selectedOrderId}`, {
          Status: currentSelectedStatus[selectedOrderId],
        });
        if (socket) {
          const message = {
            orderId: selectedOrderId,
            status: currentSelectedStatus[selectedOrderId],
          };
          socket.send(JSON.stringify(message));
        }
        setSelectedStatus((prevSelectedStatus) => ({
          ...prevSelectedStatus,
          [selectedOrderId]: currentSelectedStatus[selectedOrderId],
        }));
        window.location.reload();
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }
    setSelectedOrderId(null);
  };

  const handleShowQRModal = (order) => {
    setQRData({
      orderId: order.OrderID,
      tableId: order.TableID,
      total: order.Total,
      orderDateTime: order.OrderDateTime,
      orderedItems: order.OrderedItems.map((orderedItem) => {
        const menuItem = menuItems.find(
          (item) => item.id === orderedItem.menuId
        );
        return {
          ...orderedItem,
          name: menuItem ? menuItem.name : "Unknown Item",
          images: menuItem ? menuItem.images : null,
        };
      }),
      accountNumber: "22610017502285",
      accountName: "ABHISEK THAPA",
      bankCode: "NARBNPKA",
    });
    setShowQRModal(true);
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

  return (
    <div>
      <ul>
        <div className="container py-5 mx-auto px-[1.5%] text-xs font-semibold text-gray-700 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {orders
            .filter((order) => order.Status !== OrderStatus.PAID)
            .map((order) => (
              <li
                key={order.OrderID}
                className="mb-6 rounded-md shadow-custom-shadow p-4"
              >
                <div className="h-full flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <div>
                        <p>Order ID : {order.OrderID}</p>
                      </div>
                      <div>
                        <p>Table ID : {order.TableID}</p>
                      </div>
                      <div>
                        <p>Total: Rs.{order.Total}</p>
                        <p></p>
                      </div>
                    </div>
                    <div>
                      <p className="mb-3">
                        Booked : {formatDateTime(order.OrderDateTime)}
                      </p>
                      <p>Ordered Items : {order.OrderedItems.length}</p>
                      <ul>
                        {order.OrderedItems.map((orderedItem) => {
                          const menuItem = menuItems.find(
                            (item) => item.id === orderedItem.menuId
                          );
                          return (
                            <li
                              key={orderedItem.OrderDetailID}
                              className="flex items-center gap-1 mt-1"
                            >
                              {menuItem && menuItem.images && (
                                <img
                                  src={photo_api + menuItem.images.name}
                                  alt={menuItem.name}
                                  className="w-9 h-9 mr-2 rounded-full"
                                  title={menuItem.name}
                                />
                              )}
                              {menuItem
                                ? `${orderedItem.Quantity} x ${menuItem.name} `
                                : "Unknown Item"}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="flex">
                      <div>
                        <p className="mb-4">
                          Status:{" "}
                          {statusDisplayText[selectedStatus[order.OrderID]]}
                        </p>
                        <div className="flex flex-col gap-2">
                          {Object.values(OrderStatus).map((status) => (
                            <div key={status}>
                              <label className="inline-flex items-center">
                                <input
                                  type="radio"
                                  name={`status-${order.OrderID}`}
                                  value={status}
                                  checked={
                                    currentSelectedStatus[order.OrderID] ===
                                    status
                                  }
                                  onChange={() =>
                                    handleStatusChange(order.OrderID, status)
                                  }
                                />
                                <span className="ml-2">
                                  {statusDisplayText[status]}
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="w-full flex justify-end mr-7 items-center">
                        <button onClick={() => handleShowQRModal(order)}>
                          <span className="hover:text-black">
                            Show QR
                            <ImQrcode className="w-full text-2xl" />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-center">
                      {selectedOrderId === order.OrderID ? (
                        <div>
                          <button
                            onClick={handleSaveStatus}
                            className="primary-admin-btn hover:bg-blue-900 py-2 px-4 rounded"
                          >
                            Save Status
                          </button>
                        </div>
                      ) : (
                        <div>
                          <button
                            onClick={() => setSelectedOrderId(order.OrderID)}
                            className="primary-admin-btn hover:bg-blue-900 py-2 px-4 rounded-md"
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </div>
      </ul>
      {showQRModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-[125vh] md:h-screen bg-black bg-opacity-50 z-50 text-xs text-gray-700 font-semibold">
          <div className="bg-white rounded-lg p-8 pb-5 w-[35rem] shadow-md mx-2">
            <div>
              <div className="flex justify-between relative">
                <button onClick={() => setShowQRModal(false)} title="Close">
                  <IoClose className="text-2xl absolute -top-6 -right-2" />
                </button>
                <div className="w-full">
                  <div className="flex justify-center">
                    <img
                      src={logo}
                      alt="Cold and Spicy Logo"
                      className="w-[35%] mb-3"
                    />
                  </div>{" "}
                  <div className="flex justify-between mt-2">
                    <div>
                      <p>Order ID : {qrData.orderId}</p>
                    </div>
                    <div>
                      <p>Table ID : {qrData.tableId}</p>
                    </div>
                    <div>
                      <p>Total: Rs.{qrData.total}</p>
                      <p></p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 mt-3">
                      Booked : {formatDateTime(qrData.orderDateTime)}
                    </p>
                    <div className="flex gap-4 flex-col md:flex-row justify-between">
                      <div className="w-full">
                        <p>Ordered Items : {qrData.orderedItems.length}</p>
                        <ul>
                          {qrData.orderedItems.map((orderedItem, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-1 mt-1"
                            >
                              {orderedItem.images && (
                                <img
                                  src={photo_api + orderedItem.images.name}
                                  alt={orderedItem.name}
                                  className="w-9 h-9 mr-2 rounded-full"
                                  title={orderedItem.name}
                                />
                              )}
                              {`${orderedItem.Quantity} x ${orderedItem.name}`}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full flex justify-center">
                        <QRCode value={JSON.stringify(qrData)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
                onClick={() => setShowQRModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showPaidModal && selectedOrderId && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-[125vh] md:h-screen bg-black bg-opacity-50 z-50 text-xs text-gray-700 font-semibold">
          <div className="bg-white rounded-lg p-8 pb-5 w-[35rem] shadow-md mx-2">
            <div>
              <div className="flex justify-between relative">
                <button onClick={() => setShowPaidModal(false)} title="Close">
                  <IoClose className="text-2xl absolute -top-6 -right-2" />
                </button>
                <div className="w-full">
                  <p className="text-sm font-semibold mb-3 text-center">
                    Are you sure you want to set this order as Paid?
                  </p>
                  <div>
                    <div
                      key={selectedOrderId}
                      className="mb-6 rounded-md shadow-custom-shadow p-4"
                    >
                      <div className="h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between">
                            <div>
                              <p>Order ID : {selectedOrderId}</p>
                            </div>
                            <div>
                              <p>
                                Table ID :{" "}
                                {
                                  orders.find(
                                    (order) => order.OrderID === selectedOrderId
                                  ).TableID
                                }
                              </p>
                            </div>
                            <div>
                              <p>
                                Total: Rs.
                                {
                                  orders.find(
                                    (order) => order.OrderID === selectedOrderId
                                  ).Total
                                }
                              </p>
                              <p></p>
                            </div>
                          </div>
                          <div>
                            <p className="mb-3">
                              Booked :{" "}
                              {formatDateTime(
                                orders.find(
                                  (order) => order.OrderID === selectedOrderId
                                ).OrderDateTime
                              )}
                            </p>
                            <p>
                              Ordered Items :{" "}
                              {
                                orders.find(
                                  (order) => order.OrderID === selectedOrderId
                                ).OrderedItems.length
                              }
                            </p>
                            <ul>
                              {orders
                                .find(
                                  (order) => order.OrderID === selectedOrderId
                                )
                                .OrderedItems.map((orderedItem) => {
                                  const menuItem = menuItems.find(
                                    (item) => item.id === orderedItem.menuId
                                  );
                                  return (
                                    <li
                                      key={orderedItem.OrderDetailID}
                                      className="flex items-center gap-1 mt-1"
                                    >
                                      {menuItem && menuItem.images && (
                                        <img
                                          src={photo_api + menuItem.images.name}
                                          alt={menuItem.name}
                                          className="w-9 h-9 mr-2 rounded-full"
                                          title={menuItem.name}
                                        />
                                      )}
                                      {menuItem
                                        ? `${orderedItem.Quantity} x ${menuItem.name} `
                                        : "Unknown Item"}
                                    </li>
                                  );
                                })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-5 flex-row-reverse">
                    <button
                      className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
                      onClick={async () => {
                        try {
                          await TheBearer.put(`/order/${selectedOrderId}`, {
                            Status: OrderStatus.PAID,
                          });
                          if (socket) {
                            const message = {
                              orderId: selectedOrderId,
                              status: OrderStatus.PAID,
                            };
                            socket.send(JSON.stringify(message));
                          }
                          setSelectedStatus((prevSelectedStatus) => ({
                            ...prevSelectedStatus,
                            [selectedOrderId]: OrderStatus.PAID,
                          }));
                        } catch (error) {
                          console.error("Error updating order status:", error);
                        }
                        setSelectedOrderId(null);
                        setShowPaidModal(false);
                      }}
                    >
                      Okay
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                      onClick={() => setShowPaidModal(false)}
                    >
                      Not Okay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TheAdminOrderNotification;
