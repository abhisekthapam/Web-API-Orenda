import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";
import TheBearer from "../../../api/TheBearer";
import logo from "../../../assets/Logo.png";

function TheUserAddModal({ closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    role: Yup.string().required("Role is required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Phone number must contain at least 10 characters"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(/@gmail\.com$/, "Email must end with '@gmail.com'"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      const response = await TheBearer.post("/user/adduser", formData);
      window.location.reload();
      closeModal();
    } catch (validationErrors) {
      if (validationErrors instanceof Yup.ValidationError) {
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error adding user:", validationErrors);
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[50rem] shadow-md mx-2">
        <div className="flex justify-center">
          <img src={logo} alt="Cold and Spicy Logo" className="w-[20%]" />
        </div>
        <div className="flex justify-between mb-3 relative">
          <p className="text-xl font-bold">Add User</p>
          <button onClick={closeModal} title="Close">
            <IoClose className="text-2xl absolute -top-[5rem] md:-top-[10rem] -right-2" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <div className="w-full flex flex-col justify-between">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`mt-1 p-2 border-b ${
                    errors.name
                      ? "border-red-500 focus:outline-none shadow-custom-nav-shadow"
                      : "border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                  } rounded-md w-full`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role*
                </label>
                <div className="mt-1 flex flex-col gap-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === "admin"}
                      onChange={handleChange}
                      className="h-3 w-3"
                    />
                    <span className="ml-2 text-xs text-gray-700">Admin</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="waitress"
                      checked={formData.role === "waitress"}
                      onChange={handleChange}
                      className="h-3 w-3"
                    />
                    <span className="ml-2 text-xs text-gray-700">Waitress</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="kitchen_staff"
                      checked={formData.role === "kitchen_staff"}
                      onChange={handleChange}
                      className="h-3 w-3"
                    />
                    <span className="ml-2 text-xs text-gray-700">
                      Kitchen Staff
                    </span>
                  </label>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone*
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 p-2 border-b ${
                    errors.phone
                      ? "border-red-500 focus:outline-none shadow-custom-nav-shadow"
                      : "border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                  } rounded-md w-full`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col justify-between">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 p-2 border-b ${
                    errors.email
                      ? "border-red-500 focus:outline-none shadow-custom-nav-shadow"
                      : "border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                  } rounded-md w-full`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password*
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 p-2 border-b ${
                    errors.password
                      ? "border-red-500 focus:outline-none shadow-custom-nav-shadow"
                      : "border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                  } rounded-md w-full`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`mt-1 p-2 border-b ${
                    errors.address
                      ? "border-red-500 focus:outline-none shadow-custom-nav-shadow"
                      : "border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                  } rounded-md w-full`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TheUserAddModal;
