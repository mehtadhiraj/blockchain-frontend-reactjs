import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {message: "Here comes the message."};
  }
  componentWillMount(){
    // let headres['Accept'] = "application/json"; 
    axios.get('http://localhost:3001/')
      .then((response) => {
        console.log(response);
        this.setState({
          message : response.data.message
        })
      })
      .catch(function (error) {
        // handle error
        console.log("THis is error",error);
      });
    
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          {this.state.message}
          </a>
        </header>
      </div>
    );
  }
}

export default App;
