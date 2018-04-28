import formatErrors from '../formatErrors';

export default {
  Query: {
    findAgreement: (parent, { userId }, { models }) =>
      models.Agreement.findOne({ where: { userId } }),
  },
  Mutation: {
    validateAgreement: async (parent, args, { models }) => {
      try {
        const agreement = await models.Agreement.create(args);
        return {
          ok: true,
          agreement,
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
