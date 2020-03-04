import React, { useContext } from "react";
import { TasksContext } from "../Contexts/TasksContext";
import styled from "styled-components";
import Task from "./Task/Task";

const List = styled.div`
  width: 40%;
  min-height: 100px;
  max-height: 550px;
  overflow-y: scroll;
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

const Title = styled.h2`
  color: ${props => props.theme.colors.secondary};
  font-weight: bold;
`;

const DoneList = () => {
  const [tasks, setTasks] = useContext(TasksContext);

  const renderTasks = () => {
    return tasks.map(task => {
      const { title, description, due, todo, taskID } = task;

      return !todo ? (
        <Task
          title={title}
          description={description}
          date={due}
          id={taskID}
          todo={todo}
          key={`${title}-${description}`}
        />
      ) : null;
    });
  };
  return (
    <List>
      <Title>Done</Title>
      {tasks.length !== 0 ? renderTasks() : null}
    </List>
  );
};

export default DoneList;
