import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Chart from "chart.js/auto";
import { HiMiniEye } from "react-icons/hi2";
import TheDashboardViewModal from "../admin-modal/dashboard-modal/TheDashboardViewModal";

let chartInstance = null;

function TheAdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const chartRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderID, setSelectedOrderID] = useState(null);

  const toggleModal = (orderID) => {
    setIsModalOpen(!isModalOpen);
    setSelectedOrderID(orderID);
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const response = await axios.get(`/order/${year}/${month}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [selectedDate]);

  useEffect(() => {
    if (!loading || orders.length === 0) {
      renderChart();
    }
  }, [loading, orders]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: orders.map((order) => {
          const date = new Date(order.OrderDateTime);
          const day = date.getDate();
          return `${day}`;
        }),
        datasets: [
          {
            label: "Total",
            data: orders.map((order) => order.Total),
            fill: false,
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: "rgb(59, 130, 246)",
            pointHoverRadius: 6,
            tension: 0.2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: `Date (${getMonthName(selectedDate.getMonth() + 1).slice(
                0,
                3
              )} ${selectedDate.getFullYear()})`,
              color: "#4a5568",
            },
            ticks: {
              color: "#4a5568",
            },
            grid: {
              color: "#e2e8f0",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Total (Rs.)",
              color: "#4a5568",
            },
            ticks: {
              color: "#4a5568",
              beginAtZero: true,
            },
            grid: {
              color: "#e2e8f0",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1a202c",
            titleColor: "#cbd5e0",
            bodyColor: "#cbd5e0",
            mode: "nearest",
          },
        },
      },
    });
  };

  function getMonthName(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1];
  }

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].Total;
    }
    return total;
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
    <div className="container mx-auto p-4 text-xs font-semibold text-gray-700">
      <p className="text-4xl font-bold text-center mb-8">
        Welcome To Revenue Dashboard
      </p>
      <div className="flex justify-center items-center gap-2 mb-4">
        <div>
          <p>Choose Date</p>
        </div>
        <div>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM-yyyy"
            showMonthYearPicker
            className="p-1 border border-gray-400 rounded text-sm cursor-pointer focus:outline-none"
            calendarClassName="bg-white border rounded shadow"
            popperClassName="z-10"
          />
        </div>
      </div>
      <div>
        <div className="flex lg:flex-row-reverse flex-col-reverse gap-7 lg:gap-3 pl-3">
          <div className="w-full lg:w-[75%] h-[30vh] md:h-[70vh] flex lg:items-center items-start px-[2%]">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="w-full">
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : orders.length > 0 ? (
              <div>
                <div>
                  <div className="flex py-1 justify-center">
                    <p className="text-sm">
                      Orders in {getMonthName(selectedDate.getMonth() + 1)}{" "}
                      {selectedDate.getFullYear()} :{" "}
                      <span className="text-xs">
                        {orders.length}{" "}
                        {orders.length === 1 ? "order" : "orders"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="overflow-x-auto h-[70vh] custom-scroll">
                  <table className="table-auto w-full">
                    <thead className="sticky top-0">
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2">Order ID</th>
                        <th className="px-4 py-2">Total</th>
                        <th className="px-4 py-2">Order Date</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.OrderID} className="text-center">
                          <td className="border px-4 py-2">{order.OrderID}</td>
                          <td className="border px-4 py-2">Rs.{order.Total}</td>
                          <td className="border px-4 py-2">
                            {formatDateTime(order.OrderDateTime)}
                          </td>
                          <td className="border px-4 py-2">
                            {order.Status.charAt(0).toUpperCase() +
                              order.Status.slice(1).toLowerCase()}
                          </td>
                          <td className="border px-4 py-2">
                            <button
                              className="text-sm text-gray-600 hover:text-black"
                              title="View"
                              onClick={() => toggleModal(order.OrderID)}
                            >
                              <HiMiniEye />
                            </button>
                          </td>
                        </tr>
                      ))}

                      <tr className="bg-gray-200 text-center sticky bottom-0">
                        <th className="px-4 py-2">Total</th>
                        <td className="border px-4 py-2">
                          Rs.{calculateTotal()}
                        </td>
                        <td className="border px-4 py-2"></td>
                        <td className="border px-4 py-2"></td>
                        <td className="border px-4 py-2"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-center mt-8">
                No orders found for {getMonthName(selectedDate.getMonth() + 1)}{" "}
                {selectedDate.getFullYear()}
              </p>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TheDashboardViewModal
          closeModal={toggleModal}
          OrderID={selectedOrderID}
        />
      )}
    </div>
  );
}

export default TheAdminDashboard;
