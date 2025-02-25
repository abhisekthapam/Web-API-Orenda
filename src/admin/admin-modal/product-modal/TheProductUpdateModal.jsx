import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import logo from "../../../assets/Logo.png";
import axios from "axios";
import * as Yup from "yup";
import TheBearer from "../../../api/TheBearer";

function TheProductUpdateModal({ closeModal, productDetails }) {
  const [formData, setFormData] = useState({
    name: productDetails.name,
    price: productDetails.price,
    isAvilable: productDetails.isAvilable,
    imagesId: productDetails.imagesId,
    image: null,
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .min(0, "Price must be greater than or equal to 0")
      .required("Price is required"),
    isAvilable: Yup.boolean().required("Availability is required"),
    image: Yup.mixed().nullable(),
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === "isAvilable" ? value === "true" : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      let updatedFormData = { ...formData };
      let imageId = formData.imagesId;

      if (formData.image) {
        const formDataToSend = new FormData();
        formDataToSend.append("image", formData.image);
        const imageResponse = await axios.put(
          `/updateImage/${productDetails.imagesId}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Updated image:", imageResponse.data);
        imageId = imageResponse.data.id;
      }

      updatedFormData = {
        ...updatedFormData,
        price: parseInt(updatedFormData.price),
        imagesId: parseInt(updatedFormData.imagesId),
        name: updatedFormData.name,
      };
      const response = await TheBearer.put(
        `/menu/${productDetails.id}`,
        updatedFormData
      );
      window.location.reload();
      closeModal();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error updating product:", error);
      }
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 w-[35rem] shadow-md mx-2">
          <div>
            <div className="flex justify-center">
              <img src={logo} alt="Cold and Spicy Logo" className="w-[35%]" />
            </div>
            <div className="flex justify-between mb-3 relative">
              <p className="text-xl font-bold text-gray-700">Update Product</p>
              <button onClick={closeModal} title="Close">
                <IoClose className="text-2xl absolute -top-10 -right-2" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-semibold text-sm"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 p-2 border-b rounded-md w-full border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-gray-700 font-semibold text-sm"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-1 p-2 border-b rounded-md w-full border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-sm">{errors.price}</p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="isAvilable"
                      className="block text-gray-700 font-semibold text-sm"
                    >
                      Is Available
                    </label>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="isAvilable"
                          value="true"
                          checked={formData.isAvilable === true}
                          onChange={handleChange}
                          className="h-3 w-3"
                        />
                        <span className="ml-2 text-xs text-gray-700">
                          Available
                        </span>{" "}
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="isAvilable"
                          value="false"
                          checked={formData.isAvilable === false}
                          onChange={handleChange}
                          className="h-3 w-3"
                        />
                        <span className="ml-2 text-xs text-gray-700">
                          Not Available
                        </span>{" "}
                      </label>
                    </div>
                    {errors.isAvilable && (
                      <p className="text-red-500 text-sm">
                        {errors.isAvilable}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="block pl-2 text-gray-700 font-semibold text-sm"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      className="mt-1 p-2 w-full text-xs"
                    />
                    {formData.image && (
                      <div className="mt-2 relative">
                        <div>
                          <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Selected"
                            className="p-1 w-full h-[180px] object-contain"
                          />
                        </div>
                      </div>
                    )}
                    {errors.image && (
                      <p className="text-red-500 text-sm">{errors.image}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3">
                <button
                  type="submit"
                  className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheProductUpdateModal;
