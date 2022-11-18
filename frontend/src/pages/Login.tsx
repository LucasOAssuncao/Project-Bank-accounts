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
    <div>
      <input
        type='text'
        placeholder='User'
        onChange={({ target: { value } }) => setUser(value)}
      />
      <input
        type='text'
        placeholder='Password'
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button type='button' onClick={() => handleClick()}>
        Buscar
      </button>
      <Link to='/signup'>
        <p>Sign up</p>
      </Link>
    </div>
  );
}

export default Login;
