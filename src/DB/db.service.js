// Small helpers keep common Mongoose operations consistent across controllers.
// The returned Mongoose query can still be customized with .select(), .sort(), etc.
export const findOne = (Model, filter, projection) => Model.findOne(filter, projection);
export const findById = (Model, id, projection) => Model.findById(id, projection);
export const createOne = (Model, values) => Model.create(values);
export const updateById = (Model, id, values, options = {}) =>
  Model.findByIdAndUpdate(id, values, { new: true, runValidators: true, ...options });
