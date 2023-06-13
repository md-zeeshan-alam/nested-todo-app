const useNode = () => {
  const insertNode = function ({ userData, taskId, value }: any) {
    if (userData.id === taskId) {
      userData.task.push({
        id: new Date().getTime(),
        value: value,
        task: [],
      });

      return userData;
    }

    let latestNode = [];
    latestNode = userData.task.map((ob: any) => {
      return insertNode({ userData: ob, taskId, value });
    });

    return { ...userData, task: latestNode };
  };

  const editNode = ({ userData, taskId, value }: any) => {
    if (userData.id === taskId) {
      userData.value = value;
      return userData;
    }

    userData.task.map((ob: any) => {
      return editNode({ userData: ob, taskId, value });
    });

    return { ...userData };
  };

  const deleteNode = ({ userData, taskId }: any) => {
    for (let i = 0; i < userData.task.length; i++) {
      const currentItem = userData.task[i];
      if (currentItem.id === taskId) {
        userData.task.splice(i, 1);
        return userData;
      } else {
        deleteNode({ userData: currentItem, taskId });
      }
    }
    return userData;
  };

  return {
    insertNode,
    editNode,
    deleteNode,
  };
};

export default useNode;
