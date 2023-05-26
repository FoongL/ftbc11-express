// require Express NPM library
const express = require("express");
const cors = require("cors");
// initialize dotenv
require("dotenv").config();
// // import and set up PG
// const pg = require('pg')
// const { Pool } = pg;

// const pgConfig = {
//   user:process.env.DB_USER,
//   host:process.env.DB_HOST,
//   database:process.env.DB_DATABASE,
//   port: 5432
// }

// const pool = new Pool(pgConfig)

// console.log('pool in index:', pool)

// import database
const db = require("./db/models");
const { users, items, categories } = db;

//import controllers
const BaseController = require("./controllers/baseController.js");
const UserController = require("./controllers/userController");
const ItemController = require("./controllers/itemController");

// initialize controllers
const userController = new UserController({users, db});
const itemController = new ItemController({items, db});

// import routers
const UserRouter = require("./routers/userRouter.js");
const ItemRouter = require("./routers/itemRouter");

// initialize routers
const userRouter = new UserRouter(userController);
const itemRouter = new ItemRouter(itemController);

// Declare the port to listen to and initialise Express
const app = express();

// middlewares
//app.use(middleConsoleLogger)

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter.routes());
app.use("/items", itemRouter.routes());

const PORT = process.env.PORT;
// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
