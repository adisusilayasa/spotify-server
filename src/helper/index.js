const ErrorResponse = require("./error")

const generateId = () => {
  const index = Math.floor(Math.random() * 100);
  return index;
};

const getIndexById = (array, id, entityType) => {
  id = parseInt(id)
  const index = array.findIndex((element) => element.id === id);
  if (index < 0) {
    throw new ErrorResponse(`${entityType} was not found.`, 404);
  }
  return index;
};

module.exports = { generateId, getIndexById };
