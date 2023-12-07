export const createTaskList = (category, color) => {
  return {
    category,
    color,
    items: [],
  };
};

export const addTask = (list, task) => {
  list.items.push(task);
};

export const createTask = (desc, dateIns, dateDue, isDone) => {
  return {
    desc,
    dateIns,
    dateDue,
    isDone,
  };
};
