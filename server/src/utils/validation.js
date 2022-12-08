export const validateFormUI = (fields) => {
  const errors = [];
  const { page, perPage, title } = fields;

  if (!page && page <= 0) errors.push("Page is a required field. And should be greater than zero");
  if (!perPage && perPage <= 0) errors.push("PerPage is a required field. And should be greater than zero");
  //if (!title) errors.push("Title is a required field");

  return errors;
};
