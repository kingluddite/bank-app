import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/register">Register </Link>
    </div>
  );
}

export default Welcome;
