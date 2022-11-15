import { Options } from 'sequelize';

const config: Options = {
  username: 'root',
  password: '123456',
  database: 'NG',
  host: 'localhost',
  port: 3002,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
