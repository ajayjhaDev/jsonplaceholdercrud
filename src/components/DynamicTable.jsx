import React, { useState, useEffect, useMemo } from "react";
import api from "../utils/config";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Edit, Save, ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import Toggle from "./Toggle/Toggle";

const initialColumns = [
  { id: "name", label: "Name", visible: true },
  { id: "username", label: "Username", visible: true },
  { id: "email", label: "Email", visible: true },
  { id: "address", label: "Address", visible: true },
];

const DynamicTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState(initialColumns);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetch(`${api?.apiUrl}`)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user) => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          address: `${user.address.street}, ${user.address.city}`,
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return sortableData.filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, sortConfig, searchQuery]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleEditClick = (id) => {
    setEditingRow(id);
    const row = data.find((row) => row.id === id);
    setEditedData(row);
  };

  const handleSaveClick = async (id) => {
    // Update local state
    setData((prevData) =>
      prevData.map((row) => (row.id === id ? editedData : row))
    );
    setEditingRow(null);

    // Persist changes to the server
    try {
      const response = await fetch(`${api?.apiUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        toast.error("Failed to save data");
        throw new Error("Failed to save data");
      }

      const updatedRow = await response.json();
      console.log("Saved successfully:", updatedRow);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleInputChange = (e, field) => {
    setEditedData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleColumnVisibilityChange = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedColumns = Array.from(columns);
    const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, movedColumn);
    setColumns(reorderedColumns);
  };

  return (
    <Paper>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <ToastContainer />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="columns" direction="horizontal">
          {(provided) => (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {columns?.map(
                      (column, index) =>
                        column.visible && (
                          <Draggable
                            key={column.id}
                            draggableId={column.id}
                            index={index}
                          >
                            {(provided) => (
                              <TableCell
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={() => handleSort(column.id)}
                              >
                                {column.label}
                                {sortConfig.key === column.id &&
                                  (sortConfig.direction === "ascending" ? (
                                    <ArrowUpward />
                                  ) : (
                                    <ArrowDownward />
                                  ))}
                              </TableCell>
                            )}
                          </Draggable>
                        )
                    )}
                    {provided.placeholder}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedData
                    .slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage
                    )
                    .map((row) => (
                      <TableRow key={row.id}>
                        {columns.map(
                          (column) =>
                            column.visible && (
                              <TableCell
                                key={column.id}
                                onDoubleClick={() => handleEditClick(row.id)}
                              >
                                {editingRow === row.id ? (
                                  <TextField
                                    value={editedData[column.id] || ""}
                                    onChange={(e) =>
                                      handleInputChange(e, column.id)
                                    }
                                  />
                                ) : (
                                  row[column.id]
                                )}
                              </TableCell>
                            )
                        )}
                        <TableCell>
                          {editingRow === row.id ? (
                            <IconButton onClick={() => handleSaveClick(row.id)}>
                              <Save />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => handleEditClick(row.id)}>
                              <Edit />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Toggle
        columns={columns}
        handleColumnVisibilityChange={handleColumnVisibilityChange}
      />
    </Paper>
  );
};

export default DynamicTable;
