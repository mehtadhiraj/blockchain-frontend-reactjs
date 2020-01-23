import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            key: ""
        }
    }

    fieldChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        let params = {
            username: this.state.username,
            key: this.state.key,
        }
        console.log(params);
        axios.post('http://localhost:3000/login', params)
            .then((response)=>{
                console.log(response);
            })
            .catch((error)=> {
                console.log(error);
            })
        this.setState({
            username: "",
            key: ""
        })
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container login">
                    <div className="col-md-6 col-sm-12 offset-md-3 div-wrap">
                        <h1 align="center">
                            Wallet Login
                        </h1><br/>
                        <form method="POST">
                            <div className="form-group">
                                <label for="exampleInputEmail1">Username</label>
                                <input type="text" className="form-control" name="username" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    onChange = {this.fieldChange}
                                    value= {this.state.username}
                                    required="true"
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Enter wallet key</label>
                                <input type="password" className="form-control" name="key" id="exampleInputPassword1" 
                                    onChange = {this.fieldChange}
                                    value= {this.state.key}
                                    required="true"
                                />
                            </div>
                            <button type="submit" className="btn btn-custom container" onClick = {this.handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;