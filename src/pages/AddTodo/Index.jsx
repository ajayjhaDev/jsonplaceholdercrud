import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { progressAtom } from "../../utils/progress";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [progress, setProgress] = useAtom(progressAtom);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Header page="add" />

      <div className="pt-5" style={{ paddingLeft: "25%", paddingRight: "25%" }}>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter the description"
              onChange={(e) => setDes(e.target.value)}
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
              onClick={() => {
                setProgress([...progress, { title, des, status: "progress" }]);
                navigate("/");
              }}
            >
              ADD
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
