require("dotenv").config();

const development = {
  "username": process.env.DB_USER,
  "password": null,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT
}

const production = {
  "username": process.env.USER,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE,
  "host": process.env.HOST,
  "dialect": process.env.DIALECT
}

module.exports={
  development,
  production
}