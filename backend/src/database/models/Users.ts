import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default Users;