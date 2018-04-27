import Sequelize from 'sequelize'; // to sequelize multiple dbs

// the db name (created in psql locally for now)
const sequelize = new Sequelize('clubos', 'root', '12345', {
  host: 'localhost', // currently hosted locally
  dialect: 'postgres', // the langugae for the db
  operatorsAliases: Sequelize.Op, // to get rid of deprecated error
});

// combine the modularized models here and give them names as needed
const db = {
  User: sequelize.import('./user'),
  Agreement: sequelize.import('./agreement'),
};

// checking for associations in the model. If there are any associations,
// make the association.
Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

// attaching sequelize and Sequelize since they are needed in index.js
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
