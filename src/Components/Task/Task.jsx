import React from "react";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import TaskActions from "./TaskActions";
import TaskInfo from "./TaskInfo";

const TaskCard = styled(Card)`
  width: 95%;
  min-height: 225px;
  max-height: 250px;
  margin: 2px 0 2px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h4`
  color: ${props => props.theme.colors.secondary};
  font-weight: bold;
  margin: 10px 0px 5px 0px;
`;

const Task = ({ title, description, date, todo, id }) => {
  return (
    <TaskCard>
      <Title>{title}</Title>
      <TaskInfo description={description} date={date} />
      <TaskActions todo={todo} id={id} />
    </TaskCard>
  );
};

export default Task;
