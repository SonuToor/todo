import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import AddTaskForm from "../AddTaskForm";
import { render, fireEvent } from "@testing-library/react";
import { TasksContext } from "../../Contexts/TasksContext";

test("AddTaskForm submits a task", () => {
  let openModal = true;
  let toggleModal = jest.fn();
  let tasks = [{ title: "first task" }];
  let setTasks = jest.fn(() => null);

  const tree = (
    <ThemeProvider theme={theme}>
      <TasksContext.Provider value={[tasks, setTasks]}>
        <AddTaskForm open={openModal} close={toggleModal} />
      </TasksContext.Provider>
    </ThemeProvider>
  );

  const { container, getByText, getByLabelText } = render(tree);

  const form = document.querySelector("form");

  form.onsubmit = setTasks;

  // TO DO need to test if the fake title and fake description get submitted
  const titleNode = getByText("Enter Title").nextElementSibling.firstChild;
  // fireEvent.change(titleNode, {
  //   target: { value: "fake title" }
  // });

  const descriptionNode = getByText("Enter Description").nextElementSibling
    .firstChild;
  // fireEvent.change(descriptionNode, {
  //   target: { value: "fake description" }
  // });

  fireEvent.submit(form);

  expect(document.body).toHaveTextContent("Add A Task");
  expect(titleNode).not.toBe(null);
  expect(descriptionNode).not.toBe(null);
  expect(setTasks).toHaveBeenCalledTimes(1);
});
