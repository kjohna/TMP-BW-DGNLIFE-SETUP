// Update with your config settings.
const localPgConnection = {
  // placeholder since there is no pg locally
  host: "localhost",
  database: "design-life",
  user: "test",
  password: "pass"
};

const prodDbConnection = process.env.DATABASE_URL || localPgConnection;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/design-life.db3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: prodDbConnection,
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
