import React, { useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function SignUp() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    axios
      .post('http://localhost:3001/signup', {
        userName: user,
        password: password,
      })
      .then((_response) => alert('Usuario Cadastrado com Sucesso!'))
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
      <Link to='/login'>
        <p>Login</p>
      </Link>
    </div>
  );
}
export default SignUp;
