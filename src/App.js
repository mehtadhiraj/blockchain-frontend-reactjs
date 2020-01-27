import React from 'react';
import Login from './StaticComponents/Login';
import Navbar from './StaticComponents/Navbar';
import Register from './StaticComponents/Register';
import { Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import history from "./services/history";
import Home from "./UserComponents/Home";

const token = localStorage.getItem("jwtToken");

class App extends React.Component {
  constructor(props){
    super(props);
    if(token){
      let user = jwtDecode(token);
      this.state = {
        isAuthenticated: true,
        user: user
      }
    }else{
      this.state = {
        isAuthenticated: false,
        user: {
          _id: "",
          name: "",
          username: ""
        }
      }
    }
  }

  // If user is logged in set all the user details
  

  logOut = ()=> {
    localStorage.clear();
    this.setState({
      isAuthenticated: false,
      user: {
        _id: "",
        name: "",
        username: ""
      }
    })
  }

  logIn = (user)=>{
    this.setState({
      isAuthenticated: true,
      user: user
    })
  }

  render(){
    return (
      <Router history={history}> 
        <Navbar logOut = {this.logOut} isAuthenticated = {this.state.isAuthenticated}/>
        <Switch>
          <Route exact path="/">
            <Home logInState = {this.state} history = {history} />
          </Route>
          <Route exact path="/login">
            <Login logIn = {this.logIn} history={history} />
          </Route>
          <Route exact path="/register">
            <Register logIn = {this.logIn} history={history} />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
