export default (sequelize, DataTypes) => {
  // the agreement model with table name 'agreement'
  const Agreement = sequelize.define('agreement', {
    // the number of session the user has. min value is set to 0.
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'You don\'t have any more sessions',
        },
      },
    },
    // the current status of the customer depending on the agreement type
    status: DataTypes.STRING,
    // for the purchase date, we can use the create date
  });

  // associate the agreement with the User model since every user will have
  // some kind of agreement.
  Agreement.associate = (models) => {
    Agreement.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return Agreement;
};

