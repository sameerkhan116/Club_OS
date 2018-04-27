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
          msg: 'This field is required',
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
          msg: 'This field is required',
        },
      },
    },
    // username is string, can be alphanumeric and must be atleast 5 chraracters long and atmost 25
    username: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'The username can only contain letters and numbers',
        },
        len: {
          args: [5, 25],
          msg: 'The username needs to be between 5 and 25 characters long',
        },
      },
    },
    // the email should be of type email and not empty
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'That email is invalid',
        },
        notEmpty: {
          args: true,
          msg: 'This field is required',
        },
      },
    },
  });

  // return this created User model
  return User;
};
