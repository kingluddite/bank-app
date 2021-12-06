import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CredentialsContext } from '../App';
import { handleErrors } from '../utils/handleErrors';

const StyledError = styled.span`
  color: red;
`;

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    fetch(`http://localhost:4000/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <h1>Register</h1>
      <Link to="/">Home</Link>
      {!!error && <StyledError>{error}</StyledError>}
      <form onSubmit={register}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <br />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
