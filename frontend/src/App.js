import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import UserContext from './context/userContext';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Header />
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
