import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';
import Transactions from './Transactions';
import Users from './Users';

class Accounts extends Model {
  id!: number;
  balance!: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: INTEGER,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

Accounts.belongsTo(Users, { foreignKey: 'id', as: 'accountId' });
Accounts.belongsToMany(Transactions, { foreignKey: 'id', as: 'debitedAccountId', through: 'transactions' });
Accounts.belongsToMany(Transactions, { foreignKey: 'id', as: 'creditedAccountId', through: 'transactions' });

Users.hasOne(Accounts, { foreignKey: 'id', as: 'accountId' });
Transactions.hasMany(Transactions, { foreignKey: 'id', as: 'debitedAccountId' });
Transactions.hasMany(Transactions, { foreignKey: 'id', as: 'creditedAccountId' });

export default Accounts;