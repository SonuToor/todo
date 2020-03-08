import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import TodoList from "../TodoList";
import DoneList from "../DoneList";
import { render } from "@testing-library/react";
import { TasksContext } from "../../Contexts/TasksContext";

test("Tasks stored in context are rendered correctly based on their todo status", () => {
  const tasks = [
    {
      title: "Task 1",
      description: " fake description",
      due: new Date().toLocaleDateString("en-US"),
      todo: true,
      taskID: "task1"
    },
    {
      title: "Task 2",
      description: " fake description",
      due: new Date().toLocaleDateString("en-US"),
      todo: false,
      taskID: "task2"
    },
    {
      title: "Task 3",
      description: " fake description",
      due: new Date().toLocaleDateString("en-US"),
      todo: true,
      taskID: "task3"
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

  const { container, getAllByTitle, getByText } = render(tree);

  const todos = container.firstChild;
  const done = container.lastChild;

  const doneButtons = getAllByTitle("Done");
  const todoButtons = getAllByTitle("Todo");

  expect(todos).toHaveTextContent("Task 1");
  expect(todos).not.toHaveTextContent("Task 2");
  expect(todoButtons.length).toBe(1);

  expect(done).toHaveTextContent("Task 2");
  expect(done).not.toHaveTextContent("Task 1");
  expect(doneButtons.length).toBe(2);
});
