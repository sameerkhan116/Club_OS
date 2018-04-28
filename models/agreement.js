export default (sequelize, DataTypes) => {
  // the agreement model with table name 'agreement'
  const Agreement = sequelize.define('agreement', {
    // the number of session the user has. min value is set to 0.
    clubId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          message: 'The club ID is required',
        },
      },
    },
    due: DataTypes.FLOAT,
    active: DataTypes.BOOLEAN,
    renew: DataTypes.BOOLEAN,
    quantity: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 0,
          msg: 'You don\'t have any more sessions',
        },
      },
    },
    agreement: DataTypes.STRING,
    alert: DataTypes.STRING,
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

