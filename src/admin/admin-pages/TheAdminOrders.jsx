import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiMiniEye } from "react-icons/hi2";
import TheOrderViewModal from "../admin-modal/order-modal/TheOrderViewModal";
import TheBearer from "../../api/TheBearer";

function TheAdminOrders() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewOrder, setSelectedViewOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, productsResponse] = await Promise.all([
          TheBearer.get("/order/all"),
          axios.get("/menu/allitems"),
        ]);
        setOrderDetails(ordersResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const openViewModal = (order) => {
    setSelectedViewOrder(order);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedViewOrder(null);
    setIsViewModalOpen(false);
  };

  const getFoodItemName = (menuId) => {
    const product = products.find((product) => product.id === menuId);
    return product ? product.name : "Unknown";
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
    <div className="flex flex-col justify-center h-[88vh] px-[3%] py-[2%] mt-3">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="border border-white shadow-custom-shadow rounded-md p-2">
          <div className="sticky top-0 z-10 bg-white flex items-center">
            <div className="w-full">
              <h2 className="text-xl text-center text-gray-700 mt-2 font-bold">
                Order Details
              </h2>
            </div>
          </div>{" "}
          <div className="overflow-x-auto h-[75vh] custom-scroll bg-white">
            <table className="table-auto min-w-full">
              <thead className="sticky top-0 z-10 bg-white border-b">
                <tr className="text-sm text-gray-700">
                  <th className="px-4 py-4 font-semibold">Order Id</th>
                  <th className="px-8 py-4 font-semibold">Table No.</th>
                  <th className="px-4 py-4 font-semibold">No. of Item</th>
                  <th className="px-4 py-4 font-semibold">Items</th>
                  <th className="px-4 py-4 font-semibold">Total</th>
                  <th className="px-4 py-4 font-semibold">Date</th>
                  <th className="px-8 py-4 font-semibold">Status</th>
                  <th className="px-4 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((order) => (
                  <tr
                    key={order.OrderID}
                    className="text-center text-xs border-b rounded-full"
                  >
                    <td className="h-[10vh]">{order.OrderID}</td>
                    <td>{order.TableID}</td>
                    <td>{order.OrderedItems.length}</td>
                    <td>
                      {order.OrderedItems.slice(0, 3).map((item, index) => (
                        <span key={index}>
                          {getFoodItemName(item.menuId)}
                          {index !== 2 && ", "}
                        </span>
                      ))}
                      {order.OrderedItems.length > 3 && " ..."}
                    </td>

                    <td>Rs.{order.Total}</td>
                    <td>{formatDateTime(order.OrderDateTime)}</td>
                    <td>
                      {order.Status.toLowerCase() === "procressing"
                        ? "Processing"
                        : order.Status.charAt(0).toUpperCase() +
                          order.Status.slice(1).toLowerCase()}
                    </td>

                    <td>
                      <div className="flex justify-center items-center gap-1">
                        <button>
                          <HiMiniEye
                            className="text-sm text-gray-600 hover:text-black"
                            title="View more"
                            onClick={() => openViewModal(order)}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isViewModalOpen && (
        <TheOrderViewModal
          productDetails={selectedViewOrder}
          closeModal={closeViewModal}
        />
      )}
    </div>
  );
}

export default TheAdminOrders;
