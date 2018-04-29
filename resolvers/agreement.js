import formatErrors from '../formatErrors';

export default {
  Query: {
    findAgreement: async (parent, { userId }, { models }) => {
      const agreement = await models.Agreement.findOne({ where: { userId } });
      const {
        status, alert, due,
      } = agreement;
      let userType;
      if (status === 'active' && due === 0) {
        userType = 'Active Customer';
      } else if (due > 0) {
        userType = 'Delinquent Customer';
      } else if (status === 'suspended') {
        userType = 'Active Customer - Suspended';
      } else if (status === 'inactive' && alert === 'cancelled') {
        userType = 'Cancelled Customer';
      } else if (status === 'collections') {
        userType = 'Collections Customer';
      } else if (status === 'inactive' && alert === 'expired') {
        userType = 'Expired Customer';
      } else if (status === 'drop-in') {
        userType = 'Drop-In';
      } else if (status === 'renewal opp') {
        userType = 'Renewal Opportunity';
      }
      return {
        agreement,
        userType,
      };
    },
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
    addSession: async (parent, { userId, added }, { models }) => {
      const agreement = await models.Agreement.findOne({ where: { userId } });
      let { quantity, status } = agreement;
      console.log(quantity);
      if (quantity === 0 && added === 1) {
        status = 'drop-in';
      } else if (quantity === 1 && added === 1) {
        status = 'renewal opp';
      } else if (quantity > 2) {
        status = 'active';
      }
      quantity += added;
      await models.Agreement.update({ quantity, status }, { where: { userId } });
      return {
        userId,
        status,
        quantity,
      };
    },
  },
};
