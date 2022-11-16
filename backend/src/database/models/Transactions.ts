import { INTEGER, STRING, Model, DATE } from 'sequelize';
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
    type: DATE,
  },
}, {
  sequelize: db,
  modelName: 'transactions',
  underscored: false,
  timestamps: true,
  updatedAt: false,
});

Accounts.belongsTo(Transactions, { foreignKey: 'debitedAccountId', as: 'idDebited' });
Accounts.belongsTo(Transactions, { foreignKey: 'creditedAccountId', as: 'idCredited' });


Transactions.hasMany(Transactions, { foreignKey: 'debitedAccountId', as: 'debitedAccountId' });
Transactions.hasMany(Transactions, { foreignKey: 'creditedAccountId', as: 'creditedAccountId' });

export default Transactions;