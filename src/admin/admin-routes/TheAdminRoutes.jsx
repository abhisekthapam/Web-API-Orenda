import React from "react";
import TheAdminUser from "../admin-pages/TheAdminUser";
import { Route, Routes } from "react-router-dom";
import TheAdminSidebar from "../admin-component/TheAdminSidebar";
import TheAdminProduct from "../admin-pages/TheAdminProduct";
import TheAdminDashboard from "../admin-pages/TheAdminDashboard";
import TheAdminOrderNotification from "../admin-pages/TheAdminOrderNotification";
import TheAdminOrders from "../admin-pages/TheAdminOrders";

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
  return (
    <div className="flex flex-col md:flex-row">
      <div className="mb-1 md:mb-5 z-50 m-0 md:m3 text-xs  shadow-custom-nav-shadow md:shadow-none">
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
