import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Register from './pages/Register';

export const CredentialsContext = React.createContext();

function App() {
  const credentialsState = useState(null);

  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
