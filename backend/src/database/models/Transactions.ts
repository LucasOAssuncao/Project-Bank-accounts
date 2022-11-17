import { INTEGER, STRING, Model, DATEONLY } from 'sequelize';
import db from '.';
import Accounts from './Accounts';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
  },
  value: {
    type: INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DATEONLY,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  underscored: false,
  timestamps: true,
  updatedAt: false,
});

Transactions.belongsToMany(Accounts, { foreignKey: 'debitedAccountId', as: 'idDebited', through: "Accounts" });
Transactions.belongsToMany(Accounts, { foreignKey: 'creditedAccountId', as: 'idCredited', through: "Accounts" });


Accounts.hasOne(Transactions, { foreignKey: 'debitedAccountId', as: 'debitedId' });
Accounts.hasOne(Transactions, { foreignKey: 'creditedAccountId', as: 'creditedId' });

export default Transactions;