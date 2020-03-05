import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import TodoList from "../TodoList";
import DoneList from "../DoneList";
import AddTaskForm from "../AddTaskForm";
import { render, fireEvent } from "@testing-library/react";
import { TasksContext } from "../../Contexts/TasksContext";

test("Tasks stored in context are displayed in the correct lists based on todo status", () => {
  const tasks = [
    {
      title: "Task 1",
      description: " fake description",
      due: new Date().toLocaleDateString("en-US"),
      todo: true
    },
    {
      title: "Task 2",
      description: " fake description",
      due: new Date().toLocaleDateString("en-US"),
      todo: false
    }
  ];

  const setTasks = jest.fn();
  const tree = (
    <ThemeProvider theme={theme}>
      <TasksContext.Provider value={[tasks, setTasks]}>
        <TodoList />
        <DoneList />
      </TasksContext.Provider>
    </ThemeProvider>
  );

  const { container } = render(tree);

  const todos = container.firstChild;
  const done = container.lastChild;

  expect(todos).toHaveTextContent("Task 1");
  expect(todos).not.toHaveTextContent("Task 2");

  expect(done).toHaveTextContent("Task 2");
  expect(done).not.toHaveTextContent("Task 1");
});
