import { useAtom } from "jotai";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { editDataAtom } from "../../store/state";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { progressAtom } from "../../utils/progress";
import { pendingAtom } from "../../utils/pending";
import { completedAtom } from "../../utils/completed";

const TodoCard = ({ ele }) => {
  const [editData, setEditData] = useAtom(editDataAtom);
  const navigte = useNavigate();
  const [progress, setProgress] = useAtom(progressAtom);
  const [pending, setPending] = useAtom(pendingAtom);
  const [completed, setCompleted] = useAtom(completedAtom);
  const handleDelete = (data) => {
    if (data?.status === "progress") {
      let updated = progress?.filter((ele) => ele.title !== data?.title);
      setProgress([...updated]);
    } else if (data?.status === "pending") {
      let updated = pending?.filter((ele) => ele.title !== data?.title);
      setPending([...updated]);
    } else {
      let updated = completed?.filter((ele) => ele.title !== data?.title);
      setCompleted([...updated]);
    }
  };
  return (
    <>
      <div style={{ width: "620px", cursor: "pointer" }} className="hover-card">
        <div className="d-flex align-items-center  justify-content-between">
          <h4 style={{ color: "#034ea2" }}>{ele?.title}</h4>
          <div className="d-flex align-items-center">
            <div
              className={
                ele?.status === "progress"
                  ? "circle"
                  : ele?.status === "pending"
                  ? "circle1"
                  : "circle2"
              }
            ></div>
            <div className="ms-2 fw-bold">{`In ${ele?.status}`}</div>
          </div>
        </div>
        <div>{ele?.des}</div>
        <div className="d-flex justify-content-end">
          <FaRegEdit
            fontSize={22}
            onClick={() => {
              setEditData(ele);
              navigte("/edit");
            }}
          />

          <MdDelete
            fontSize={22}
            className="ms-5"
            onClick={() => handleDelete(ele)}
          />
        </div>
        <hr className="new4" />
      </div>
    </>
  );
};

export default TodoCard;
