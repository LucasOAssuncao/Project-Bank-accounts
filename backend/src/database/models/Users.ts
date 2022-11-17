import { INTEGER, STRING, Model } from 'sequelize';
import Accounts from './Accounts';
import db from '.';

class Users extends Model {
  id!: number;
  userName!: string;
  password!: string;
  accountId!: number;
}

Users.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
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
  },
  {
    sequelize: db,
    modelName: 'users',
    underscored: false,
    timestamps: false,
  }
);

Users.belongsTo(Accounts, { foreignKey: 'accountId', as: 'idOfAccount' });

Accounts.hasOne(Users, { foreignKey: 'accountId', as: 'idAccount' });

export default Users;
