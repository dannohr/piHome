module.exports = {
  development: {
    local: {
      dialect: "sqlite",
      storage: "../db/piHome.db",
      seederStorage: "sequelize"
    },
    meterReader: {
      username: "apps",
      password: "Password1",
      database: "meterReader",
      host: "192.168.1.100",
      dialect: "postgres",
      seederStorage: "sequelize",
      logging: false,
      define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
      }
    },

    dart: {
      username: "apps",
      password: "Password1",
      database: "meterReader",
      schema: "dart",
      host: "192.168.1.100",
      dialect: "postgres",
      seederStorage: "sequelize",
      logging: false,
      define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
      }
    },

    pg: {
      username: "apps",
      password: "Password1",
      database: "meterReader",
      host: "192.168.1.100",
      dialect: "postgres"
    }
  },

  test: {
    username: "sa",
    password: "Password1",
    database: "rentalApp",
    host: "192.168.1.100",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true,
      options: {
        requestTimeout: 60000,
        port: 1433
      }
    },
    define: {
      freezeTableName: true
    },
    seederStorage: "sequelize",
    logging: false
    // logging: console.log
  },
  meterReader: {
    username: "sa",
    password: "Password1",
    database: "meterReader",
    host: "192.168.1.100",
    dialect: "mssql",
    dialectOptions: {
      encrypt: true,
      options: {
        requestTimeout: 60000,
        port: 1433
      }
    },
    define: {
      freezeTableName: true
    },
    seederStorage: "sequelize",
    logging: false
    // logging: console.log
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: "mysql",
    use_env_variable: "DATABASE_URL"
  }
};
