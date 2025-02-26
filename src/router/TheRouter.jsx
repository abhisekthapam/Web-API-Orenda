import React from "react";
import { Route, Routes } from "react-router-dom";
import TheHome from "../pages/TheHome";
import TheMenu from "../pages/TheMenu";
import TheContactUs from "../pages/TheContactUs";
import TheNavbar from "../components/TheNavbar";
import TheLogin from "../pages/TheLogin";
import TheViewOrder from "../pages/TheViewOrder";
import TheTableDetails from "../pages/TheTableDetails";
import TheError from "../pages/TheError";

function TheRouter() {
  const routes = [
    { path: "/", element: <TheHome /> },
    { path: "/menu", element: <TheMenu /> },
    { path: "/contact-us", element: <TheContactUs /> },
    { path: "/login", element: <TheLogin /> },
    { path: "/view-order", element: <TheViewOrder /> },
    { path: "/table/:tableNumber", element: <TheTableDetails /> },
  ];

  return (
    <div>
      <div className="mb-5 shadow-custom-nav-shadow sticky top-0 z-50 bg-white py-1 text-sm">
        <TheNavbar />
      </div>
      <div className="">
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route path="*" element={<TheError />} />
        </Routes>
      </div>
    </div>
  );
}

export default TheRouter;
