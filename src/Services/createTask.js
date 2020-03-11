const createTask = (title, description, dueDate) => {
  let newTask = {
    taskID: `${title}-${Date.now()}`,
    title: title,
    description: description,
    due: dueDate.toLocaleDateString("en-US"),
    todo: true
  };
  return newTask
}

export default createTask