import React from "react";
import { Checkbox } from "@mui/material";

const Toggle = ({ columns, handleColumnVisibilityChange }) => {
  return (
    <>
      <div style={{ padding: "16px" }}>
        <h3>Toggle Column Visibility</h3>
        {columns.map((column) => (
          <div key={column.id}>
            <Checkbox
              checked={column.visible}
              onChange={() => handleColumnVisibilityChange(column.id)}
            />
            {column.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Toggle;
