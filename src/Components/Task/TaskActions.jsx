import React, { useContext, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import EditTaskForm from "./EditTaskForm";
import { TasksContext } from "../../Contexts/TasksContext";

const Panel = styled.div`
  margin-left: 50%;
`;

const TaskActions = ({ todo, id }) => {
  const [tasks, setTasks] = useContext(TasksContext);
  const [openEditForm, toggleEditForm] = useState(false);

  const handleDelete = () => {
    let newTasks = tasks.filter(task => {
      return task.taskID !== id;
    });
    setTasks(newTasks);
  };

  const handleStatus = () => {
    let newTasks = tasks.map(task => {
      if (task.taskID === id)
        return {
          ...task,
          todo: !todo
        };
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <>
      <Panel>
        {todo ? (
          <IconButton onClick={handleStatus}>
            <DoneIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleStatus}>
            <ArrowBackIosIcon />
          </IconButton>
        )}
        <IconButton onClick={() => toggleEditForm(true)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Panel>
      <EditTaskForm
        open={openEditForm}
        close={() => toggleEditForm(false)}
        id={id}
      />
    </>
  );
};

export default TaskActions;
