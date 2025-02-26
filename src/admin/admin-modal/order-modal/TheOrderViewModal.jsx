import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import photo_api from "../../../api/photoConfig";
import logo from "../../../assets/Logo.png";

function TheOrderViewModal({ productDetails, closeModal }) {
  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/menu/allitems");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    fetchProducts();
  }, []);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 w-[35rem] shadow-md mx-2">
          <div>
            <div className="flex justify-center">
              <img src={logo} alt="Cold and Spicy Logo" className="w-[25%]" />
            </div>{" "}
            <div className="flex justify-between mb-3 relative">
              <p className="text-xl font-bold text-gray-700">Order Details</p>
              <button onClick={closeModal} title="Close">
                <IoClose className="text-2xl absolute -top-[8rem] -right-2" />
              </button>
            </div>
            <div className="flex text-xs font-semibold text-gray-700">
              <div className="w-full flex flex-col gap-4 mt-3">
                <div>
                  <p>
                    Order Id :{" "}
                    <span className="font-light">{productDetails.OrderID}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Table No. :{" "}
                    <span className="font-light">{productDetails.TableID}</span>
                  </p>
                </div>
                <div>
                  <p>
                    No. of Items :{" "}
                    <span className="font-light">
                      {productDetails.OrderedItems.length}
                    </span>
                  </p>
                </div>
                <div>
                  <p>Item Name : </p>
                  <span className="font-light">
                    {productDetails.OrderedItems.map((item, index) => {
                      const product = products.find(
                        (product) => product.id === item.menuId
                      );
                      return (
                        <div key={index}>
                          <p className="">
                            {product ? product.name : "Unknown"}
                          </p>
                        </div>
                      );
                    })}
                  </span>
                </div>
                <div>
                  <p>Item Images : </p>
                  <div className="grid grid-cols-4 mr-[10%]">
                    {productDetails.OrderedItems.map((item, index) => {
                      const product = products.find(
                        (product) => product.id === item.menuId
                      );
                      return (
                        <div key={index}>
                          <button
                            onClick={() =>
                              handleImageClick(
                                product ? photo_api + product.images.name : null
                              )
                            }
                          >
                            {product && product.images && (
                              <img
                                src={photo_api + product.images.name}
                                title={product.name}
                                className="w-10 h-10 mr-2 rounded-full cursor-pointer"
                              />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <p>
                    Total : Rs.
                    <span className="font-light">{productDetails.Total}</span>
                  </p>
                </div>
                <div>
                  <p>
                    Date :{" "}
                    <span className="font-light">
                      {formatDateTime(productDetails.OrderDateTime)}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Status :{" "}
                    <span className="font-light">
                      {productDetails.Status.toLowerCase() === "procressing"
                        ? "Processing"
                        : productDetails.Status.charAt(0).toUpperCase() +
                          productDetails.Status.slice(1).toLowerCase()}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full h-[50vh] flex justify-center items-center object-contain">
                {selectedImage ? (
                  <img src={selectedImage} className="object-contain" />
                ) : (
                  productDetails.OrderedItems.length > 0 &&
                  products.length > 0 && (
                    <img
                      src={
                        photo_api +
                        products.find(
                          (product) =>
                            product.id === productDetails.OrderedItems[0].menuId
                        ).images.name
                      }
                      className="object-contain"
                    />
                  )
                )}
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

export default TheOrderViewModal;
