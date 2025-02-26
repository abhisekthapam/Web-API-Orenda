import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import TheBearer from "../../../api/TheBearer";
import logo from "../../../assets/Logo.png";

function TheUserDeleteModal({ userId, onCancel, handleDelete }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await TheBearer.get(`/user/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const deleteUser = async () => {
    try {
      await TheBearer.delete(`/user/${userId}`);
      handleDelete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      onCancel();
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 w-[35rem] shadow-md mx-2">
        <div>
          <div className="flex justify-center">
            <img src={logo} alt="Cold and Spicy Logo" className="w-[25%]" />
          </div>
          <div className="flex justify-between mb-3 relative">
            <p className="text-xl font-bold text-red-500">Delete User</p>
            <button onClick={onCancel} title="Close">
              <IoClose className="text-2xl absolute -top-[8rem] -right-2" />
            </button>
          </div>
        </div>
        {userData ? (
          <div className="text-xs text-gray-700">
            <p className="text-red-500 font-semibold">
              Are you sure you want to delete the user?
            </p>
            <ul className="mt-4 flex flex-col gap-5">
              <li>
                <strong>ID:</strong> {userData.id}
              </li>
              <li>
                <strong>Full Name:</strong> {userData.name}
              </li>
              <li>
                <strong>Email:</strong> {userData.email}
              </li>
              <li>
                <strong>Phone Number:</strong> {userData.phone}
              </li>
              <li>
                <strong>Role:</strong> {userData.role}
              </li>
              <li>
                <strong>Created At:</strong> {userData.createdAt}
              </li>
            </ul>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
}

export default TheUserDeleteModal;
