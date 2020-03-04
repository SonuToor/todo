import CardContent from "@material-ui/core/CardContent";
import React from "react";
import styled from "styled-components";

const Description = styled.div`
  width: 90%;
  max-height: 80px;
  overflow-y: scroll;
`;

const DueDate = styled.h6`
  margin: 10px 0px 5px 0px;
`;

const TaskInfo = ({ description, date }) => {
  return (
    <CardContent>
      <DueDate>{`Due: ${date}`}</DueDate>
      <Description>{description}</Description>
    </CardContent>
  );
};

export default TaskInfo;
