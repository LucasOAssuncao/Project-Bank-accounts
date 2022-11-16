import { INTEGER, Model, DECIMAL } from 'sequelize';
import db from '.';
import Transactions from './Transactions';

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
    type: DECIMAL,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'accounts',
  underscored: false,
  timestamps: false,
});

export default Accounts;