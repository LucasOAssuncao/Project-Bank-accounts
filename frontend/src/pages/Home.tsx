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
    <div className='flex'>
      {token && (
        <div>
          <header className='flex justify-end gap-8 bg-gray-800 text-white p-[5px] w-[100vw]'>
            <h3>Hello {user.userName}</h3>
            <h3>Balance: {user.balance}</h3>
            <button
              className='bg-white text-black p-[2px] w-[80px] rounded hover:bg-gray-400'
              type='button'
              onClick={() => logout()}
            >
              Logout
            </button>
          </header>
          <section className='flex m-auto self-center bg-gray-300 flex-col items-center gap-4 p-10 pt-5 w-[100vw] lg-card'>
            <h2 className='text-[25px] sign'>Cash Out</h2>
            <div className='flex gap-5'>
              <label className='text-[20px] sign'>To:</label>
              <input
                className='input input-bordered input-sm text-center '
                type='text'
                onChange={({ target: { value } }) => setReceiver(value)}
              />
              <label className='text-[20px] sign'>Value:</label>
              <input
                className='input input-bordered input-sm text-center'
                type='text'
                onChange={({ target: { value } }) => setQty(value)}
              />
              <button className='bg-black text-white p-[2px] w-[80px] rounded hover:bg-gray-400' type='button' onClick={() => handleClick()}>
                Confirm
              </button>
            </div>
          </section>
          <div className='flex flex-col items-center gap-2 bg-gray-800 text-white p-[5px] w-[100vw]'>
            <h2 className='text-[25px] sign'>Transactions</h2>
            <div className='flex gap-6'>
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
              className='input input-bordered input-sm text-center h-[25px] w-[10vw]'
              type='text'
              placeholder='YYYY/MM/DD'
              onChange={({ target: { value } }) => setDate(value)}
            />
            </div>
          </div>
          <div className='lg-card flex flex-wrap justify-center gap-10 p-10 pt-5 w-[100vw]'>
          {transactions.length &&
            transactions.map((transaction: any, index: number) => (
              <div className='flex flex-col gap-1 text-start text-[18px] w-[20%]' key={index}>
                <h3>Created at: {transaction.createdAt}</h3>
                <h3>Credited accountId: {transaction.creditedAccountId}</h3>
                <h3>Value: {transaction.value}</h3>
              </div>
            ))}
            </div>
        </div>
      )}
    </div>
  );
}
export default Home;
