import Dialog from "@material-ui/core/Dialog";
import DatePicker from "react-date-picker";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useContext, useState } from "react";
import { TasksContext } from "../Contexts/TasksContext";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

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

const AddTaskForm = ({ open, close }) => {
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [dueDate, updateDueDate] = useState(new Date());
  const [tasks, setTasks] = useContext(TasksContext);

  const handleSubmit = event => {
    event.preventDefault();

    if (title === "" || description === "") {
      return;
    }

    let newTask = {
      taskID: `${title}-${Date.now()}`,
      title: title,
      description: description,
      due: dueDate.toLocaleDateString("en-US"),
      todo: true
    };

    setTasks(tasks => [...tasks, newTask]);

    updateTitle("");
    updateDescription("");
    updateDueDate(new Date());

    close();
  };

  const reset = () => {
    updateTitle("");
    updateDescription("");
    updateDueDate(new Date());
    close();
  };
  return (
    <Dialog open={open}>
      <DialogTitle style={{ textAlign: "center" }}>Add A Task</DialogTitle>
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

export default AddTaskForm;
