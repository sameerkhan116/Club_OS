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
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    alert: DataTypes.STRING,
    createdAt: DataTypes.DATEONLY,
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The current customer status is required',
        },
      },
    },
    endAt: DataTypes.STRING,
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

