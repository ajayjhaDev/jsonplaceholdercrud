import React from "react";
import { Container } from "@mui/material";
import DynamicTable from "./components/DynamicTable";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Container>
      <h1>Enhanced Dynamic Table View</h1>
      <DynamicTable />
    </Container>
  );
}

export default App;
