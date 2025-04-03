// src/config/database.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.MYSQL_DB || 'yelp';
const dbPassword = process.env.MYSQL_PASSWORD || 'root';
const dbHost = process.env.MYSQL_HOST || 'db_yelp';

const sequelize = new Sequelize(dbName, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: false, 
});

export default sequelize;
