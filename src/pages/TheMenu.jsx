import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import photo_api from "../api/photoConfig";
import ThePlaceOrderModal from "../menu-modal/ThePlaceOrderModal";

function TheMenu() {
  const selectedTable = localStorage.getItem("selectedTable");
  const [quantities, setQuantities] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPlaceModal, setShowPlaceModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuItems();
  }, []);
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("/menu/allitems");
      setMenuItems(response.data);
      setQuantities(Array(response.data.length).fill(0));
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
    if (!selectedItems.includes(index)) {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
      if (newQuantities[index] === 0) {
        setSelectedItems(selectedItems.filter((item) => item !== index));
      }
      setQuantities(newQuantities);
    }
  };

  const handlePlaceOrder = () => {
    setShowPlaceModal(true);
  };

  const handlePlaceModal = () => {
    setShowPlaceModal(false);
  };

  return (
    <div className="container mx-auto px-[2%] md:px-[4%] lg:px-[10%]">
      <div className="sticky top-[4.2rem] z-50 primary-bg-color flex items-center gap-2 mb-5 py-1">
        <p className="font-bold text-gray-700 w-full text-end ml-16">
          Table {selectedTable}
        </p>
        <div className="w-full flex justify-end gap-1 md:gap-3">
          <Link to="/view-order">
            <button className="primary-btn-color p-[0.47rem] rounded-md text-xs hidden md:block">
              View Order
            </button>
          </Link>
          <button
            onClick={handlePlaceOrder}
            className="primary-btn-color p-[0.47rem] rounded-md text-xs"
          >
            Place Order
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-custom-shadow"
          >
            <img
              className="w-full h-60 object-cover object-center"
              src={photo_api + item.images.name}
              alt={item.name}
              title={item.name}
            />
            <div className="p-4">
              <p className="text-sm text-gray-700 font-semibold mb-2">
                {item.name}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700 font-bold text-sm">
                    Rs.{item.price}
                  </p>
                </div>
                <div>
                  {item.isAvilable ? (
                    quantities[index] === 0 ? (
                      <button
                        className="text-xs primary-btn-color p-[0.42rem] rounded-md"
                        onClick={() => handleIncrement(index)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="flex justify-between items-center gap-2 primary-border rounded-md">
                        <button
                          className="text-sm primary-color px-2 py-1 font-bold rounded"
                          onClick={() => handleDecrement(index)}
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold primary-color">
                          {quantities[index]}
                        </span>
                        <button
                          className="text-sm primary-color px-2 py-1 font-bold rounded"
                          onClick={() => handleIncrement(index)}
                        >
                          +
                        </button>
                      </div>
                    )
                  ) : (
                    <button className="text-xs out-of-stock p-[0.42rem] rounded-md pointer-events-none">
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showPlaceModal && (
        <ThePlaceOrderModal
          orders={selectedItems.map((index) => ({
            id: menuItems[index].id,
            name: menuItems[index].name,
            quantity: quantities[index],
            price: menuItems[index].price,
            image: menuItems[index].images.name,
          }))}
          onCancel={handlePlaceModal}
        />
      )}
    </div>
  );
}

export default TheMenu;
