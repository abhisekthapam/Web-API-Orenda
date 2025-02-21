import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiMiniEye } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import TheProductAddModal from "../admin-modal/product-modal/TheProductAddModal";
import TheProductViewModal from "../admin-modal/product-modal/TheProductViewModal";
import TheProductUpdateModal from "../admin-modal/product-modal/TheProductUpdateModal";
import TheProductDeleteModal from "../admin-modal/product-modal/TheProductDeleteModal";
import TheImageMagnifier from "../../custom-hooks/TheImageMagnifier";
import photo_api from "../../api/photoConfig";

function TheAdminProduct() {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewProduct, setSelectedViewProduct] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUpdateProduct, setSelectedUpdateProduct] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openViewModal = (product) => {
    setSelectedViewProduct(product);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedViewProduct(null);
    setIsViewModalOpen(false);
  };

  const openUpdateModal = (product) => {
    setSelectedUpdateProduct(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUpdateProduct(null);
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = () => {
    closeUpdateModal();
  };

  const openConfirmation = (productId) => {
    setDeleteProductId(productId);
    setShowConfirmation(true);
  };

  const cancelConfirmation = () => {
    setDeleteProductId(null);
    setShowConfirmation(false);
  };

  const handleDelete = (deletedProductId) => {
    setProducts(products.filter((product) => product.id !== deletedProductId));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/menu/allitems");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products : ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col justify-center h-[88vh] px-[3%] py-[2%] mt-3">
      <div className="border border-white shadow-custom-shadow rounded-md p-2">
        <div className="sticky top-0 z-10 bg-white flex items-center">
          <div className="w-full">
            <h2 className="text-xl text-center text-gray-700 mt-2 font-bold">
              Product Details
            </h2>
          </div>
          <div className="pr-6">
            <button
              className="bg-black text-white p-1 px-2 rounded-md cursor-pointer flex items-center gap-1"
              title="Add Product"
              onClick={openAddModal}
            >
              Add
              <FaPlus />
            </button>
          </div>
        </div>{" "}
        <div className="overflow-x-auto h-[75vh] custom-scroll bg-white">
          <table className="table-auto min-w-full">
            <thead className="sticky top-0 z-10 bg-white border-b">
              <tr className="text-sm text-gray-700">
                <th className="px-4 py-4 font-semibold">Product ID</th>
                <th className="px-4 py-4 font-semibold">Product Name</th>
                <th className="px-8 py-4 font-semibold">Price</th>
                <th className="px-4 py-4 font-semibold">Image</th>
                <th className="px-8 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="text-center text-xs border-b rounded-full"
                >
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>Rs.{product.price}</td>
                  <td>
                    <div className="h-[120px] w-full">
                      <TheImageMagnifier
                        imageUrl={photo_api + product.images.name}
                      />
                    </div>
                  </td>
                  <td className="flex items-center justify-center gap-1 h-[144px]">
                    {product.isAvilable ? (
                      <FaCircle className="text-green-600 text-[8px]" />
                    ) : (
                      <FaCircle className="text-amber-600 text-[8px]" />
                    )}
                    {product.isAvilable ? "Available" : "Not Available"}
                  </td>

                  <td>
                    {" "}
                    <div className="flex justify-center items-center gap-1">
                      <button>
                        <HiMiniEye
                          className="text-sm text-gray-600 hover:text-black"
                          title="View more"
                          onClick={() => openViewModal(product)}
                        />
                      </button>
                      <button
                        className="text-sm text-gray-600 hover:text-black"
                        title="Edit"
                        onClick={() => openUpdateModal(product)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-sm text-gray-600 hover:text-black"
                        title="Delete"
                        onClick={() => openConfirmation(product.id)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddModalOpen && <TheProductAddModal closeModal={closeAddModal} />}
      {isViewModalOpen && (
        <TheProductViewModal
          productDetails={selectedViewProduct}
          closeModal={closeViewModal}
        />
      )}
      {isUpdateModalOpen && (
        <TheProductUpdateModal
          productDetails={selectedUpdateProduct}
          closeModal={closeUpdateModal}
          onUpdate={handleUpdate}
        />
      )}
      {showConfirmation && (
        <TheProductDeleteModal
          productId={deleteProductId}
          onCancel={cancelConfirmation}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default TheAdminProduct;
