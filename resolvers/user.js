import formatErrors from '../formatErrors';

export default {
  Query: {
    allUsers: async (parent, args, { models }) =>
      models.User.findAll({
        include: [{
          model: models.Agreement,
          attributes: ['status'],
        }],
      }),
    user: (parent, { id }, { models }) =>
      models.User.findOne({ where: { id } }),
    statusUsers: (parent, { type }, { models }) => models.User.findAll({
      include: [{
        model: models.Agreement,
        attributes: ['status'],
        where: {
          status: type,
        },
      }],
    }),
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
