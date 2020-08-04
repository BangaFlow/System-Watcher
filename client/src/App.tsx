import React from 'react';
import { 
  NavLink, 
  Switch,
  Route
} from 'react-router-dom'
import './App.css';
import User from './components/users/User';

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="hurray">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="hurray">About</NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="hurray">Users</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <User />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

export default App;
