import React, { useState } from 'react';
import styled from 'styled-components';

const StyledError = styled.span`
  color: red;
`;

const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      .then(() => {})
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <h1>Register</h1>
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
