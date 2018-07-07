import React, { Component } from 'react';
import octogon from './octogon.svg';
import fire from './config/fire';
import './App.css';
import Login from './Login';
import Home from './Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.authListener = this.authListener.bind(this);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={octogon} className="App-logo" alt="logo" />
          <h1 className="App-title">2928</h1>
        </header>
    {this.state.user ? (<Home />) : (<Login />)}
      </div>
    );
  }
}

export default App;
