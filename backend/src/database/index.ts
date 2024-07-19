import { Sequelize } from "sequelize-typescript";
import Customer from "../models/Customer";
import Transaction from "../models/Transaction";
import Card from "../models/Card";


// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

const models = [
  Customer,
  Transaction,
  Card
];

sequelize.addModels(models);

export default sequelize;
