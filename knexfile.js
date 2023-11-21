require("dotenv").config();
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DBLOCAL_HOST,
      user: process.env.USER,
      password: process.env.DBLOCAL_PASSWORD,
      database: process.env.DBLOCAL_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};
