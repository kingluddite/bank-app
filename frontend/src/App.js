import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';

export const CredentialsContext = React.createContext();

function App() {
  // tmp credendentials to avoid refresh losing credential's state
  // TODO: fix this with localStorage - https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
  const credentialsState = useState();

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
