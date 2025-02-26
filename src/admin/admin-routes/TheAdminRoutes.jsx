import React from "react";
import { FaLock } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import TheAdminSidebar from "../admin-component/TheAdminSidebar";
import TheAdminDashboard from "../admin-pages/TheAdminDashboard";
import TheAdminOrderNotification from "../admin-pages/TheAdminOrderNotification";
import TheAdminOrders from "../admin-pages/TheAdminOrders";
import TheAdminProduct from "../admin-pages/TheAdminProduct";
import TheAdminUser from "../admin-pages/TheAdminUser";

const getToken = () => {
  return localStorage.getItem("token");
};

function TheAdminRoutes() {
  const routes = [
    { path: "/admin-user", element: <TheAdminUser /> },
    { path: "/admin-product", element: <TheAdminProduct /> },
    { path: "/admin-dashboard", element: <TheAdminDashboard /> },
    {
      path: "/admin-order-notification",
      element: <TheAdminOrderNotification />,
    },
    { path: "/admin-order", element: <TheAdminOrders /> },
  ];

  const token = getToken();

  if (!token) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-12 rounded-lg shadow-lg text-center w-96">
          <div className="flex justify-center mb-4">
            <FaLock className="text-red-500 w-8 h-8" />
          </div>
          <h2 className="font-bold text-gray-800">Access Denied</h2>
          <p className="text-gray-600 mt-4 text-xs">
            Please log in to access the admin panel.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-block w-full py-[10px] text-white text-xs font-bold rounded-[3px] bg-gradient-to-r from-black to-blue-500 transition-colors duration-300 hover:from-blue-500 hover:to-black"
          >
            Go to Login Page
          </Link>
          <p className="text-gray-500 text-xs mt-4">
            Need help?{" "}
            <Link to="/support" className="font-semibold text-gray-800">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="mb-1 md:mb-5 z-50 m-0 md:m3 text-xs shadow-custom-nav-shadow md:shadow-none">
        <TheAdminSidebar />
      </div>
      <div className="h-[100vh] border-l md:w-full w-[124%] custom-scroll">
        <div className="h-[100vh] custom-scroll">
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default TheAdminRoutes;
