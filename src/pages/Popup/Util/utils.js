export const createTaskList = (category, color) => {
  console.log('create a list');
  return {
    category,
    color,
    items: [],
  };
};

export const createTask = (label, desc, dateIns, dateDue, isDone) => {
  console.log('created');
  return {
    label,
    desc,
    dateIns,
    dateDue,
    isDone,
  };
};
