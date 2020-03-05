import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import TodoList from "../TodoList";
import AddTaskForm from "../AddTaskForm";
import { render, fireEvent } from "@testing-library/react";
import { TasksProvider } from "../../Contexts/TasksContext";

test("Clicking the add will open a modal", () => {
  const tree = (
    <ThemeProvider theme={theme}>
      <TasksProvider>
        <TodoList>
          <AddTaskForm />
        </TodoList>
      </TasksProvider>
    </ThemeProvider>
  );

  const { container, getByText } = render(tree);

  const addButton = getByText("Add").parentElement;

  const rightClick = { button: 2 };
  fireEvent.click(addButton, rightClick);
  console.log(document.body.innerHTML);
  expect(container).toHaveTextContent("Add A Task");
});
