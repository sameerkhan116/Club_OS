export default(sequelize, DataTypes) => {
  // the user model with the name 'user'
  const User = sequelize.define('user', {
    // firstname and lastname need to only alphabets and not empty
    firstname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Only use alphabets in your name',
        },
        notEmpty: {
          args: true,
          msg: 'The first name is requred to complete registration',
        },
      },
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Only use alphabets in your name',
        },
        notEmpty: {
          args: true,
          msg: 'The lastname is required to complete registration',
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The gender is required to complete registratio',
        },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          message: 'Please enter your age in numbers',
        },
        min: {
          args: 16,
          message: 'You must be atlest 16 years old to join this gym',
        },
        max: {
          args: 80,
          message: 'You cannot be older than 80',
        },
      },
    },
    location: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: 'The location is required to complete registration',
        },
        isInt: {
          args: true,
          msg: 'Please enter your area code in numbers',
        },
      },
    },
    // the email should be of type email and not empty
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'That email has already been used',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'That email is invalid',
        },
        notEmpty: {
          args: true,
          msg: 'The email is required to complete registratio',
        },
      },
    },
    createdAt: DataTypes.DATEONLY,
    status: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasOne(models.Agreement, {
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  // return this created User model
  return User;
};
