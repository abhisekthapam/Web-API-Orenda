import React, { useEffect, useState } from "react";
import { HiMiniEye } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import TheUserAddModal from "../admin-modal/user-modal/TheUserAddModal";
import TheUserDeleteModal from "../admin-modal/user-modal/TheUserDeleteModal";
import TheUserUpdateModal from "../admin-modal/user-modal/TheUserUpdateModal";
import TheUserViewModal from "../admin-modal/user-modal/TheUserViewModal";
import TheBearer from "../../api/TheBearer";

function TheAdminUser() {
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedViewUser, setSelectedViewUser] = useState(null);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openConfirmation = (userId) => {
    setDeleteUserId(userId);
    setShowConfirmation(true);
  };

  const cancelConfirmation = () => {
    setDeleteUserId(null);
    setShowConfirmation(false);
  };

  const handleDelete = (deletedUserId) => {
    setUsers(users.filter((user) => user.id !== deletedUserId));
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUser(null);
    setIsUpdateModalOpen(false);
  };

  const openViewModal = (user) => {
    setSelectedViewUser(user);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setSelectedViewUser(null);
    setIsViewModalOpen(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await TheBearer.get("/user/all");
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users : ", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col justify-center h-[88vh] px-[3%] py-[2%] mt-3">
      <div className="border border-white shadow-custom-shadow rounded-md p-2">
        <div className="sticky top-0 z-10 bg-white flex items-center">
          <div className="w-full">
            <h2 className="text-xl text-center text-gray-700 mt-2 font-bold">
              User Details
            </h2>
          </div>
          <div className="pr-6">
            <button
              className="bg-black text-white p-1 px-2 rounded-md cursor-pointer flex items-center gap-1"
              onClick={openAddModal}
              title="Add User"
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
                <th className="px-4 py-4 font-semibold">User ID</th>
                <th className="px-4 py-4 font-semibold">Full name</th>
                <th className="px-4 py-4 font-semibold">Phone number</th>
                <th className="px-8 py-4 font-semibold">Email</th>
                <th className="px-8 py-4 font-semibold">Password</th>
                <th className="px-8 py-4 font-semibold">Role</th>
                <th className="px-8 py-4 font-semibold">Created At</th>
                <th className="px-4 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center text-xs">
                  <td className="border-b px-4 py-5">{user.id}</td>
                  <td className="border-b px-4 py-5">{user.name}</td>
                  <td className="border-b px-4 py-5">{user.phone}</td>
                  <td className="border-b px-4 py-5">{user.email}</td>
                  <td className="border-b px-4 py-5">
                    {user.password ? "**********" : ""}
                  </td>

                  <td className="border-b px-4 py-5">{user.role}</td>
                  <td className="border-b px-4 py-5">{user.createdAt}</td>
                  <td className="border-b px-4 py-5">
                    {" "}
                    <div className="flex justify-center items-center gap-1">
                      <button>
                        <HiMiniEye
                          className="text-sm text-gray-600 hover:text-black"
                          title="View more"
                          onClick={() => openViewModal(user)}
                        />
                      </button>
                      <button
                        className="text-sm text-gray-600 hover:text-black"
                        title="Edit"
                        onClick={() => openUpdateModal(user)}
                      >
                        <MdEdit />
                      </button>
                      <button
                        className="text-sm text-gray-600 hover:text-black"
                        title="Delete"
                        onClick={() => openConfirmation(user.id)}
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
      {isAddModalOpen && <TheUserAddModal closeModal={closeAddModal} />}
      {showConfirmation && (
        <TheUserDeleteModal
          userId={deleteUserId}
          onCancel={cancelConfirmation}
          handleDelete={handleDelete}
        />
      )}
      {isUpdateModalOpen && (
        <TheUserUpdateModal
          userDetails={selectedUser}
          closeModal={closeUpdateModal}
        />
      )}
      {isViewModalOpen && (
        <TheUserViewModal
          userDetails={selectedViewUser}
          closeModal={closeViewModal}
        />
      )}
    </div>
  );
}

export default TheAdminUser;
