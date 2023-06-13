import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ModalComponent from "../Modal";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import AddTaskForm from "../AddTaskForm";
import { Ttask, Ttaskpayload } from "../../utils/type";

import "./styles.css";
import { AppContext } from "../../utils/appContext";

interface ITodoList {
  handleInsertNode: ({ taskId, value }: Ttaskpayload) => void;
  handleEditNode: ({ taskId, value }: Ttaskpayload) => void;
  handleDeleteNode: (taskId: number) => void;
  task: Ttask;
}

const TodoList = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  task,
}: ITodoList) => {
  const [input, setInput] = useState<string>("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [expand, setExpand] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const context: any = useContext(AppContext);
  const { actions } = context || {};

  const onAddTask = () => {
    if (editMode) {
      handleEditNode({
        taskId: task.id,
        value: input,
      });
    } else {
      setExpand(true);
      handleInsertNode({ taskId: task.id, value: input });
    }
    setInput("");

    setModalOpen(false);

    if (editMode) setEditMode(false);
  };

  const handleEdit = (value: string) => {
    setInput(value);
    setModalOpen(true);
    setEditMode(true);
  };

  const handleDelete = () => {
    handleDeleteNode(task.id);
  };

  const handleSubTask = () => {
    setModalOpen(true);
  };

  const handleLogout = () => {
    actions.signOut();
    navigate("/");
  };

  useEffect(() => {
    if (task?.id === 1) {
      setExpand(true); // show task in case of login back
    }
  }, [task?.id === 1]);

  return (
    <div>
      <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <AddTaskForm
          input={input}
          setInput={setInput}
          onAddTask={onAddTask}
          editMode={editMode}
        />
      </ModalComponent>

      {task?.id === 1 ? (
        <div className="dashboardHeader">
          <button className="btn" onClick={() => setModalOpen(true)}>
            Add Task
          </button>
          <p className="logout" onClick={handleLogout}>
            Logout
          </p>
        </div>
      ) : (
        <div className="taskCard">
          <div className="task">
            {task?.task?.length ? (
              expand ? (
                <MdKeyboardArrowUp
                  style={{ fontSize: "20px" }}
                  onClick={() => setExpand(false)}
                />
              ) : (
                <MdKeyboardArrowDown
                  style={{ fontSize: "20px" }}
                  onClick={() => setExpand(true)}
                />
              )
            ) : null}
            <h3 className="taskValue">{task.value}</h3>
          </div>
          <div className="actionBtnWrapper">
            <AiFillEdit
              style={{ fontSize: "20px" }}
              onClick={() => handleEdit(task.value)}
            />
            <AiFillDelete style={{ fontSize: "20px" }} onClick={handleDelete} />
            <button className="addSubTaskBtn" onClick={handleSubTask}>
              Add Subtask
            </button>
          </div>
        </div>
      )}

      <div
        className="taskWrapper"
        style={{ display: expand ? "flex" : "none" }}
      >
        {task?.task?.map((item: any) => {
          return (
            <TodoList
              key={item.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              task={item}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
