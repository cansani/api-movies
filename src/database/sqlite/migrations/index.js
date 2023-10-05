const createUsers = require('./createUsers');
const sqlConnection = require('../../sqlite')

async function runMigrations() {
  const schemas = [
    createUsers
  ].join('')

  sqlConnection().then(db => db.exec(schemas).catch(err => console.error(err)))
}

module.exports = runMigrations