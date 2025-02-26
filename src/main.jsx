import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import TheAdminRoutes from "./admin/admin-routes/TheAdminRoutes.jsx";
import axios from "axios";

const AppRouter = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin-");
  return isAdminRoute ? <TheAdminRoutes /> : <App />;
};

axios.defaults.baseURL = "http://localhost:4000/api/v1";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AppRouter />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
