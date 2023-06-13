import React, { ChangeEvent } from "react";
import "./styles.css";

interface IAddTaskForm {
  input: string;
  setInput: (input: string) => void;
  onAddTask: () => void;
  editMode: boolean;
}

const AddTaskForm = ({
  input,
  setInput,
  onAddTask,
  editMode,
}: IAddTaskForm) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  return (
    <div className="mainContainer">
      <h2>TODO</h2>
      <input
        value={input}
        placeholder="Enter a task"
        type="text"
        onChange={handleOnChange}
        className="input"
      />
      <button onClick={onAddTask} className="btn">
        {editMode ? "Save" : "Add Task"}
      </button>
    </div>
  );
};

export default AddTaskForm;
