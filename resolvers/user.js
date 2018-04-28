import formatErrors from '../formatErrors';

export default {
  Query: {
    allUsers: (parent, args, { models }) =>
      models.User.findAll(),
    user: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const user = await models.User.create(args);
        return {
          ok: true,
          user,
        };
      } catch (err) {
        return {
          ok: false,
          error: formatErrors(err, models),
        };
      }
    },
  },
};
