const editTask = (id, tasks, title, description, dueDate) => {
  let newTasks = tasks.map(task => {
    if (task.taskID === id)
      return {
        ...task,
        title: title,
        description: description,
        due: dueDate.toLocaleDateString("en-US"),
      };
    return task;
  });

  return newTasks
}

export default editTask