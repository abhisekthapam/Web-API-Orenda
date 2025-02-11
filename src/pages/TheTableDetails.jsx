import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function TheTableDetails() {
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("selectedTable", tableNumber);
    const timeout = setTimeout(() => {
      navigate("/menu");
    }, 0);

    return () => clearTimeout(timeout);
  }, [tableNumber, navigate]);

  return (
    <div>
      <p>Selected Table: {tableNumber}</p>
    </div>
  );
}

export default TheTableDetails;
