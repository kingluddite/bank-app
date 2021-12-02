import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            Hi
          </Route>
          <Route exact path="/">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
