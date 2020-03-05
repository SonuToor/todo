import React from "react";
import TodoList from "./Components/TodoList";
import DoneList from "./Components/DoneList";
import { TasksProvider } from "./Contexts/TasksContext";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import theme from "./theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.main};
    font-family: ${props => props.theme.font};
  }
`;

const Main = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 5%;
  width: 80%;
  display: flex;
  justify-content: space-around;
  @media (max-width: 1200px) {
    flex-direction: column;
    width: 95%;
    margin-left: 2.5%;
    font-size: 75%;
  }
`;

const Title = styled.h1`
  text-align: center;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TasksProvider>
        <GlobalStyle />
        <Title>git stuff -done </Title>
        <Main>
          <TodoList />
          <DoneList />
        </Main>
      </TasksProvider>
    </ThemeProvider>
  );
}

export default App;
