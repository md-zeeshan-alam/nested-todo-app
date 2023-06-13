import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TSignIn, TUser, Ttaskpayload } from "./type";
import useNode from "../hooks/useNode";

export const AppContext = React.createContext({});
const initialData = {
  id: 1,
  token: localStorage.getItem("jwt-token")
    ? JSON.parse(localStorage.getItem("jwt-token") || "")
    : "",
  username: "",
  password: "",
  task: [],
};

interface IContextWrapper {
  children: React.ReactNode;
}
export const ContextWrapper = ({ children }: IContextWrapper) => {
  const [store, setStore] = useState<TUser>(initialData);
  const navigate = useNavigate();

  const [actions, _setActions] = useState<any>({
    addTask: ({ taskId, value }: Ttaskpayload) =>
      handleInsertNode({ taskId, value }),
    editTask: ({ taskId, value }: Ttaskpayload) =>
      handleEditNode({ taskId, value }),
    deleteTask: (taskId: number) => handleDeleteNode(taskId),
    signIn: ({ username, password, token }: any) =>
      handleSignIn({ username, password, token }),
    signOut: () => handleSignOut(),
  });

  const { insertNode, editNode, deleteNode } = useNode();

  const handleSignIn = ({ username, password, token }: TSignIn) => {
    const data = { ...store, username, password, token };
    setStore(data);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt-token");
    const data = { ...store, username: "", password: "", token: "" };
    setStore(data);
    navigate("/");
  };

  const handleInsertNode = ({ taskId, value }: Ttaskpayload) => {
    const finalStructure = insertNode({
      userData: store,
      taskId,
      value,
    });
    setStore(finalStructure);
  };

  const handleEditNode = ({ taskId, value }: Ttaskpayload) => {
    const finalStructure = editNode({
      userData: store,
      taskId,
      value,
    });
    setStore(finalStructure);
  };

  const handleDeleteNode = (taskId: number) => {
    const finalStructure = deleteNode({
      userData: store,
      taskId,
    });
    const temp = { ...finalStructure };
    setStore(temp);
  };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};
