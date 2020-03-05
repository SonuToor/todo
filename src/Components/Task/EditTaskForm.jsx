import Dialog from "@material-ui/core/Dialog";
import DatePicker from "react-date-picker";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, { useContext, useState, useEffect } from "react";
import { TasksContext } from "../../Contexts/TasksContext";
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
const EditTaskForm = ({ open, close, id }) => {
  const [title, updateTitle] = useState("");
  const [description, updateDescription] = useState("");
  const [dueDate, updateDueDate] = useState(new Date());
  const [tasks, setTasks] = useContext(TasksContext);

  const handleEdit = event => {
    event.preventDefault();

    if (title === "" || description === "") {
      return;
    }

    let newTasks = tasks.map(task => {
      if (task.taskID === id)
        return {
          ...task,
          title: title,
          description: description
        };
      return task;
    });
    setTasks(newTasks);

    close();
  };

  const reset = () => {
    close();
  };

  useEffect(() => {
    // fill in fields with existing data
    let currentTask = tasks.find(task => task.taskID === id);
    updateTitle(currentTask.title);
    updateDescription(currentTask.description);
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle style={{ textAlign: "center" }}>Edit A Task</DialogTitle>
      <DialogContent>
        <Form onSubmit={handleEdit}>
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
            disabled
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
          <Button type="submit" onClick={handleEdit}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskForm;
