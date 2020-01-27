import React from 'react';
import axios from 'axios';
import { setHeader, setToken } from '../services/auth';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            username: "",
            password: ""
        }
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        });
    }
    
    handleSubmit = (event)=>{
        // console.log(this.state);
        this.setState({
            name: "",
            username: "",
            password: ""
        });
        axios.post('http://localhost:3001/register', this.state)
            .then((response)=>{
                // console.log(response);
                setHeader(response.data.token);
                setToken(response.data.token); 
                this.props.logIn(response.data.user);
                this.props.history.push("/");
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    render(){
        return(
            <div>
                <div className="container login">
                    <div className="col-md-6 col-sm-12 offset-md-3 div-wrap">
                        <h1 align="center">
                            Wallet Registration
                        </h1><br/>
                        <form method="POST">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Name</label>
                                <input type="text" className="form-control" name="name" id="exampleInputEmail1" aria-describedby="emailHelp"
                                    onChange = {this.handleChange}
                                    value= {this.state.name}
                                    required={true}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">Username</label>
                                <input type="text" className="form-control" name="username" id="exampleInputEmail2" aria-describedby="emailHelp"
                                    onChange = {this.handleChange}
                                    value= {this.state.username}
                                    required={true}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="exampleInputEmail3">Username</label>
                                <input type="text" className="form-control" name="username" id="exampleInputEmail3" aria-describedby="emailHelp"
                                    onChange = {this.handleChange}
                                    value= {this.state.username}
                                    required={true}
                                />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword4">Password</label>
                                <input type="password" className="form-control" name="password" id="exampleInputPassword4" 
                                    onChange = {this.handleChange}
                                    value= {this.state.password}
                                    required={true}
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

export default Register;