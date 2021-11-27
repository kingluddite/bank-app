import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './context/userContext';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
        <Routes>
          <Route exact path="/" component={Home} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
