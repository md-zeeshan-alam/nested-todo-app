import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../../utils/appContext";
import { Ttaskpayload } from "../../utils/type";
import TodoList from "../TodoList";

import "./styles.css";

const Dashboard = () => {
  const context: any = useContext(AppContext);
  const { store, actions } = context;

  const handleInsertNode = ({ taskId, value }: Ttaskpayload) => {
    actions.addTask({ taskId, value });
  };

  const handleEditNode = ({ taskId, value }: Ttaskpayload) => {
    actions.editTask({ taskId, value });
  };

  const handleDeleteNode = (taskId: number) => {
    actions.deleteTask(taskId);
  };

  return (
    <div className="dashboardMainContainer">
      <TodoList
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
        task={store}
      />
    </div>
  );
};

export default Dashboard;
