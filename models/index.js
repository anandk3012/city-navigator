// models/index.js
import { Sequelize } from 'sequelize';
import UserModel from './user';
import FareInfoModel from './fareinfo';
import ServiceInfoModel from './serviceinfo';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Disable logging; default: console.log
});

const User = UserModel(sequelize, Sequelize.DataTypes);
const FareInfo = FareInfoModel(sequelize, Sequelize.DataTypes);
const ServiceInfo = ServiceInfoModel(sequelize, Sequelize.DataTypes);

// Define associations if needed (e.g., User hasMany FareInfos)

sequelize.sync();

export { sequelize, User, FareInfo, ServiceInfo };
