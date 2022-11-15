import { INTEGER, STRING, Model, DATE } from 'sequelize';
import db from '.';
import Users from './Users';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt: Date;
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
  underscored: true,
  timestamps: false,
});

export default Transactions;