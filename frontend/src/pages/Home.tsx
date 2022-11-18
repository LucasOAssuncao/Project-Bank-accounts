import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const [user, setUser] = useState({}) as any;
  const [token, setToken] = useState('');
  const [qty, setQty] = useState('');
  const [transactions, setTransactions] = useState([]) as any;
  const [receiver, setReceiver] = useState('');
  const [date, setDate] = useState('') as any;

  useEffect(() => {
    const storage = localStorage.getItem('Token');

    if (storage?.length) {
      setToken(storage);
      axios.defaults.headers.common = { Authorization: storage };

      axios
        .get('http://localhost:3001/login')
        .then((response) => {
          setUser(response.data);
          setTransactions(response.data.transactions);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      history.push('/login');
    }
  }, [token, history]);

  const handleClick = () => {
    axios
      .post('http://localhost:3001/transactions', {
        receiver: receiver,
        value: qty,
      })
      .then((_response) => {
        alert('Successful transaction');
        window.location.reload();
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const filterTransactionsIn = () => {
    axios
      .get('http://localhost:3001/transactions/in', {
        params: {
          date,
        },
      })
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const filterTransactionsOut = () => {
    axios
      .get('http://localhost:3001/transactions/out', {
        params: {
          date,
        },
      })
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      {token && (
        <div>
          <header>
            <h3>Olá {user.userName}</h3>
            <h3>Balance: {user.balance}</h3>
            <button type='button' onClick={() => logout()}>
              Logout
            </button>
          </header>
          <div>
            <h2>Transactions</h2>
            <label htmlFor='in'>
              <input
                type='radio'
                name='filter'
                id='in'
                onChange={() => filterTransactionsIn()}
              />
              In
            </label>
            <label htmlFor='out'>
              <input
                type='radio'
                name='filter'
                value='http://localhost:3000/transactions/out'
                id='out'
                onChange={() => filterTransactionsOut()}
              />
              Out
            </label>
            <input
              type='text'
              placeholder='YYYY/MM/DD'
              onChange={({ target: { value } }) => setDate(value)}
            />
          </div>
          <section>
            <h2>Cash Out</h2>
            <label>
              To:
              <input
                type='text'
                onChange={({ target: { value } }) => setReceiver(value)}
              />
            </label>
            <label>
              Value:
              <input
                type='text'
                onChange={({ target: { value } }) => setQty(value)}
              />
            </label>
            <button type='button' onClick={() => handleClick()}>
              Confirm
            </button>
          </section>
          {transactions.length &&
            transactions.map((transaction: any, index: number) => (
              <div key={index}>
                <h3>Created at: {transaction.createdAt}</h3>
                <h3>Credited accountId: {transaction.creditedAccountId}</h3>
                <h3>Value: {transaction.value}</h3>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
export default Home;
