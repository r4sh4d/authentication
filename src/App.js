import React from 'react';
import styles from './App.module.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Signup from './components/Signup';
import PassReset from './components/PassReset'

function App() {
  return (
    <Router>
      <div>
        <div className={styles.logoContainer}>
          <a href="https://www.prospectsmb.com/az"><img src={require("./images/logo-black.png")} alt="Logo" /></a>
        </div>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/recovery" component={PassReset} />
      </div>
    </Router>
  );
}

export default App;
