import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import "./App.css";
import { useAtom } from "jotai";
import { progressAtom } from "./utils/progress";
import TodoCard from "./components/TodoCard/TodoCard";
import { IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { pendingAtom } from "./utils/pending";
import { completedAtom } from "./utils/completed";

const App = () => {
  const [progress] = useAtom(progressAtom);
  const [pending] = useAtom(pendingAtom);
  const [completed] = useAtom(completedAtom);
  const navigate = useNavigate();
  const [serachVal, setSearchVal] = useState("");
  const [serachData, setSearchData] = useState([]);

  useEffect(() => {
    let serachedArr = [...progress, ...pending, ...completed];
    if (serachVal?.length >= 2) {
      setSearchData(
        serachedArr?.filter((ele) =>
          ele?.title
            ?.toLocaleLowerCase()
            ?.includes(serachVal?.toLocaleLowerCase())
        )
      );
    }
  }, [serachVal]);

  return (
    <>
      <Header />

      <div className="mt-5" style={{ paddingRight: "25%", paddingLeft: "25%" }}>
        <input
          type="text"
          name="search"
          placeholder="Search To-Do by Title"
          className="input-search"
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      {serachVal?.length >= 2 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
          className="mt-4 mx-auto"
        >
          <Accordion
            defaultActiveKey="2"
            style={{ width: "100%" }}
            className="mt-3"
          >
            <Accordion.Item eventKey="2">
              <Accordion.Header>{`Serached (${serachData?.length})`}</Accordion.Header>
              <Accordion.Body>
                <div>
                  {serachData?.map((ele) => (
                    <TodoCard ele={ele} />
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
          className="mt-4 mx-auto"
        >
          <Accordion defaultActiveKey="0" style={{ width: "100%" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{`In Progress (${progress?.length})`}</Accordion.Header>
              <Accordion.Body>
                <div>
                  {progress?.map((ele) => (
                    <TodoCard ele={ele} />
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey="1"
            style={{ width: "100%" }}
            className="mt-3"
          >
            <Accordion.Item eventKey="1">
              <Accordion.Header>{`Pending (${pending?.length})`}</Accordion.Header>
              <Accordion.Body>
                <div>
                  {pending?.map((ele) => (
                    <TodoCard ele={ele} />
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Accordion
            defaultActiveKey="2"
            style={{ width: "100%" }}
            className="mt-3"
          >
            <Accordion.Item eventKey="2">
              <Accordion.Header>{`completed (${completed?.length})`}</Accordion.Header>
              <Accordion.Body>
                <div>
                  {completed?.map((ele) => (
                    <TodoCard ele={ele} />
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      )}

      <IoAddCircleSharp
        fontSize={80}
        style={{ color: "#034ea2" }}
        className="fixed-bottom-right"
        onClick={() => navigate("/add")}
      />
    </>
  );
};

export default App;
