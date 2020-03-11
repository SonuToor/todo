import Dialog from "@material-ui/core/Dialog";
import DatePicker from "react-date-picker";
import Button from "@material-ui/core/Button";
import createTask from "../Services/createTask";
import editTask from "../Services/editTask";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useContext, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { TasksContext } from "../Contexts/TasksContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  min-height: 300px;
  margin: 10px 0 10px 0;
`;

const TextInputs = styled.div`
  margin-bottom: 25%;
  display: flex;
  flex-direction: column;
`;

const ModalForm = ({ open, close, type, id }) => {
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [dueDate, updateDueDate] = useState(new Date());
  const [tasks, setTasks] = useContext(TasksContext);

  const handleSubmit = event => {
    event.preventDefault();

    if (title === "" || description === "") {
      return;
    }

    if (type === "Add") {
      setTasks(tasks => [...tasks, createTask(title, description, dueDate)]);
      updateTitle("");
      updateDescription("");
      updateDueDate(new Date());
    } else {
      setTasks(editTask(id, tasks, title, description, dueDate));
    }
    close();
  };

  const reset = () => {
    if (type === "Add") {
      updateTitle("");
      updateDescription("");
      updateDueDate(new Date());
    }
    close();
  };
  useEffect(() => {
    if (type === "Edit") {
      let currentTask = tasks.find(task => task.taskID === id);
      updateTitle(currentTask.title);
      updateDescription(currentTask.description);
    }
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle
        style={{ textAlign: "center" }}
      >{`${type} A Task`}</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleSubmit}>
          <TextInputs>
            <TextField
              label="Enter Title"
              value={title}
              required
              onChange={e => updateTitle(e.target.value)}
            />
            <TextField
              label="Enter Description"
              multiline
              required
              rows="4"
              value={description}
              onChange={e => updateDescription(e.target.value)}
            />
          </TextInputs>
          <DatePicker
            value={dueDate}
            onChange={date => updateDueDate(date)}
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            hourPlaceholder="hh"
            minutePlaceholder="mm"
          />
        </Form>
        <DialogActions>
          <Button onClick={reset}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ModalForm;
