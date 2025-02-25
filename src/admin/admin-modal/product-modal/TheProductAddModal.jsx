import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import TheBearer from "../../../api/TheBearer";
import logo from "../../../assets/Logo.png";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).required("Name is required"),
  price: Yup.number()
    .min(0, "Price must be greater than or equal to 0")
    .required("Price is required"),
  isAvilable: Yup.boolean(),
  image: Yup.mixed()
    .test("fileRequired", "Image is required", (value) => {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return false;
      }
      return true;
    })
    .nullable(),
});

const TheProductAddModal = ({ closeModal }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      isAvilable: true,
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await validationSchema.validate(values, { abortEarly: false });
        const formData = new FormData();
        formData.append("image", values.image);
        const response = await TheBearer.post("/upload/", formData);
        const id = response.data.imageFile.id;
        formik.setFieldValue("imagesId", id);
        await TheBearer.post("/menu/additem", { ...values, imagesId: id });
        window.location.reload();
        closeModal();
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setSelectedImage(URL.createObjectURL(file));
    formik.setFieldValue("image", file);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[50rem] shadow-md mx-2">
        <div className="flex justify-center">
          <img src={logo} alt="Cold and Spicy Logo" className="w-[35%]" />
        </div>
        <div className="flex justify-between mb-3 relative">
          <p className="text-xl font-bold text-gray-700">Add Product</p>
          <button onClick={closeModal} title="Close">
            <IoClose className="text-2xl absolute -top-12 -right-2" />
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-5 p-2">
            <div className="w-full">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                  className="mt-1 p-2 border-b rounded-md w-full border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price*
                </label>
                <input
                  id="price"
                  type="number"
                  {...formik.getFieldProps("price")}
                  className="mt-1 p-2 border-b rounded-md w-full border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Is Available*
                </label>
                <div className="flex flex-col gap-2 mt-2">
                  <label
                    htmlFor="available"
                    className="inline-flex items-center"
                  >
                    <input
                      type="radio"
                      id="available"
                      name="isAvilable"
                      value="true"
                      checked={formik.values.isAvilable === true}
                      onChange={() => formik.setFieldValue("isAvilable", true)}
                      className="h-3 w-3"
                    />
                    <span className="ml-2 text-xs text-gray-700">
                      Available
                    </span>
                  </label>
                  <label
                    htmlFor="not-available"
                    className="inline-flex items-center"
                  >
                    <input
                      type="radio"
                      id="not-available"
                      name="isAvilable"
                      value="false"
                      checked={formik.values.isAvilable === false}
                      onChange={() => formik.setFieldValue("isAvilable", false)}
                      className="h-3 w-3"
                    />
                    <span className="ml-2 text-xs text-gray-700">
                      Not Available
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="mb-1">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700"
                >
                  Add Image
                </label>
                <input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 p-2 w-full focus:outline-none text-xs"
                />
                {formik.touched.image && formik.errors.image ? (
                  <div className="text-red-500 text-sm p-2">
                    {formik.errors.image}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected Image"
                    className="h-[200px] w-[250px] object-contain"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <button
              type="submit"
              className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TheProductAddModal;
