import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddTaskForm from "./AddTaskForm";
import IconButton from "@material-ui/core/IconButton";
import React, { useContext, useState } from "react";
import { TasksContext } from "../Contexts/TasksContext";
import Task from "./Task/Task";
import styled from "styled-components";

const List = styled.div`
  width: 40%;
  max-height: 550px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.backgroundColors.secondary};
  border-radius: ${props => props.theme.borderRadius};
  @media (max-width: 1200px) {
    width: 80%;
    margin-left: 10%;
  }
`;

const Title = styled.div`
  display: flex;
  width: 90%;
  margin-left: 40%;
  justify-content: space-evenly;
  color: ${props => props.theme.colors.secondary};
  font-weight: bold;
`;

const TodoList = () => {
  const [openTasksForm, toggleTasksForm] = useState(false);
  const [tasks, setTasks] = useContext(TasksContext);

  const renderTasks = () => {
    return tasks.map(task => {
      const { title, description, due, todo, taskID } = task;

      return todo ? (
        <Task
          title={title}
          description={description}
          date={due}
          id={taskID}
          todo={todo}
          key={taskID}
        />
      ) : null;
    });
  };

  return (
    <>
      <List>
        <Title>
          <h2>To Do</h2>
          <IconButton onClick={() => toggleTasksForm(true)}>
            Add
            <AddCircleIcon />
          </IconButton>
        </Title>
        {tasks.length !== 0 ? renderTasks() : null}
      </List>
      <AddTaskForm open={openTasksForm} close={() => toggleTasksForm(false)} />
    </>
  );
};

export default TodoList;
