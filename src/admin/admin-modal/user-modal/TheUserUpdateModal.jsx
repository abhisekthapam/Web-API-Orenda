import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";
import TheBearer from "../../../api/TheBearer";
import logo from "../../../assets/Logo.png";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/@gmail\.com$/, "Email must end with @gmail.com"),
});

function TheUserUpdateModal({ userDetails, closeModal }) {
  const [formData, setFormData] = useState({
    name: userDetails.name || "",
    role: userDetails.role || "",
    phone: userDetails.phone || "",
    email: userDetails.email || "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const dataToUpdate = {
        id: userDetails.id,
        name: formData.name,
        role: formData.role,
        phone: formData.phone,
        email: formData.email,
      };
      const response = await TheBearer.put(
        `/user/${userDetails.id}`,
        dataToUpdate
      );
      window.location.reload();
      closeModal();
    } catch (error) {
      if (error.name === "ValidationError") {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setFormErrors(errors);
      } else {
        console.error("Error updating user:", error);
      }
    }
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
              <p className="text-xl font-bold text-gray-700">Update User</p>
              <button onClick={closeModal} title="Close">
                <IoClose className="text-2xl absolute -top-[8rem] -right-2" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
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
              </div>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <div className="mt-1">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === "admin"}
                      onChange={handleChange}
                      className="h-3 w-3"
                    />
                    <span className="ml-1 text-xs text-gray-700">Admin</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="role"
                      value="waitress"
                      checked={formData.role === "waitress"}
                      onChange={handleChange}
                      className="h-3 w-3"
                    />
                    <span className="ml-1 text-xs text-gray-700">Waitress</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="role"
                      value="kitchen_staff"
                      checked={formData.role === "kitchen_staff"}
                      onChange={handleChange}
                      className="h-3 w-3"
                    />
                    <span className="ml-1 text-xs text-gray-700">
                      Kitchen Staff
                    </span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 p-2 border-b rounded-md w-full border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 border-b rounded-md w-full border-gray-300 focus:outline-none text-xs shadow-custom-nav-shadow"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 primary-admin-btn rounded-md hover:bg-blue-900"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TheUserUpdateModal;
