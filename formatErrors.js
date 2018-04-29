import { pick } from 'lodash';

// get the validation errors from sequelize and map them properly, otherwise return
// something went wrong.
const formatErrors = (e, models) => {
  if (e instanceof models.sequelize.ValidationError) {
    return e.errors.map(x => pick(x, ['path', 'message']));
  }
  return [{ path: 'Error!', message: 'Oops! Something went wrong!' }];
};

export default formatErrors;
