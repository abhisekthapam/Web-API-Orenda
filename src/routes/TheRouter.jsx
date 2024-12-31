import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import TheNavbar from "../components/TheNavbar";
import TheHome from "../pages/TheHome";
import TheMenu from "../pages/TheMenu";

function TheRouter() {
  const location = useLocation();
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 },
  };

  const routes = [
    { path: "/", element: <TheHome /> },
    { path: "/menu", element: <TheMenu /> },
  ];

  return (
    <div className="text-primary bg-neutral">
      <motion.div
        className="sticky top-0 z-50 bg-white"
        initial={{ y: -100 }}
        animate={{ y: isNavbarVisible ? 0 : -100 }}
        transition={{ duration: 0.5 }}
      >
        <TheNavbar />
      </motion.div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {routes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<motion.div {...pageTransition}>{element}</motion.div>}
            />
          ))}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default TheRouter;
