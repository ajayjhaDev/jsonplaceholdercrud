import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ page }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        background: "#034ea2",
        height: "80px",
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
      }}
      className="ps-5 fw-bold"
    >
      {page === "edit" || page === "add" ? (
        <>
          <FaArrowLeft
            onClick={() => navigate("/")}
            className="me-3"
            style={{ cursor: "pointer" }}
          />
          {page === "edit" ? "Edit Task" : "Add Task"}
        </>
      ) : (
        "TO-DO APP"
      )}
    </div>
  );
};

export default Header;
