const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "oregon",
    database: "crowsourcing",
  },
});

module.exports = knex;
