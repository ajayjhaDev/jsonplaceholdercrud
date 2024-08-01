import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { progressAtom } from "../../utils/progress";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { editDataAtom } from "../../store/state";
import { pendingAtom } from "../../utils/pending";
import { completedAtom } from "../../utils/completed";
import Select from "react-select";

const options = [
  {
    value: "progress",
    label: (
      <div className="d-flex align-items-center">
        <div className="circle"></div>
        <span className="ms-3">progress</span>
      </div>
    ),
  },
  {
    value: "pending",
    label: (
      <div className="d-flex align-items-center">
        <div className="circle1"></div>
        <span className="ms-3">pending</span>
      </div>
    ),
  },
  {
    value: "completed",
    label: (
      <div className="d-flex align-items-center">
        <div className="circle2"></div>
        <span className="ms-3">completed</span>
      </div>
    ),
  },
];

const Index = () => {
  const [progress, setProgress] = useAtom(progressAtom);
  const [pending, setPending] = useAtom(pendingAtom);
  const [completed, setCompleted] = useAtom(completedAtom);
  const [editData] = useAtom(editDataAtom);
  const [title, setTitle] = useState(editData?.title || "");
  const [des, setDes] = useState(editData?.des || "");
  const navigate = useNavigate();
  const initialSelectedOption =
    options.find((option) => option.value === editData?.status) || "";
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleUpdate = () => {
    if (editData?.status === "progress") {
      let updated = progress?.filter((ele) => ele.title !== editData?.title);
      setProgress([...updated]);
    } else if (editData?.status === "pending") {
      let updated = pending?.filter((ele) => ele.title !== editData?.title);
      setPending([...updated]);
    } else {
      let updated = completed?.filter((ele) => ele.title !== editData?.title);
      setCompleted([...updated]);
    }

    if (selectedOption?.value === "progress") {
      setProgress([...progress, { title, des, status: selectedOption?.value }]);
      navigate("/");
    } else if (selectedOption?.value === "pending") {
      setPending([...pending, { title, des, status: selectedOption?.value }]);
      navigate("/");
    } else {
      setCompleted([
        ...completed,
        { title, des, status: selectedOption?.value },
      ]);
      navigate("/");
    }
  };

  return (
    <>
      <Header page="edit" />

      <div className="pt-5" style={{ paddingLeft: "25%", paddingRight: "25%" }}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter the description"
              onChange={(e) => setDes(e.target.value)}
              value={des}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </Form.Group>
        </Form>

        <div className="d-flex justify-content-between">
          <div>
            <Button variant="outline-primary" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              variant="success"
              className="px-4 add-app"
              style={{ background: "#034ea2" }}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
