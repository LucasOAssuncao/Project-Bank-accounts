import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    axios
      .post('http://localhost:3001/login', {
        userName: user,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('Token', response.data.token);
        history.push('/');
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col mt-[15%] justify-center items-center rounded gap-4 p-[40px] lg-card'>
          <input
            className="input input-bordered input-sm text-center"
            type='text'
            placeholder='User'
            onChange={({ target: { value } }) => setUser(value)}
          />
          <input
            className="input input-bordered input-sm text-center"
            type='password'
            placeholder='Password'
            onChange={({ target: { value } }) => setPassword(value)}
          />
          <button className="button-log" type='button' onClick={() => handleClick()}>
            Login
          </button>
          <Link className="underline text-blue-800 text-[12px] sign" to='/signup'>
            <p>Sign up</p>
          </Link>
      </div>
    </div>
  );
}

export default Login;
