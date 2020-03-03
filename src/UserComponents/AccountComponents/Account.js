import React from 'react';
import axios from 'axios';
import { setHeader } from "../../services/auth";
import AddAccount from './AddAccount';
import AccountCards from './AccountCards';

class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accountNo: "",
            ifsc: "",
            branch: "",
            bankName: "",
            error: "",
            alertType: "info",
            accounts: []
        }
    }

    getAccount = ()=>{
        setHeader(localStorage.getItem('jwtToken'));
        axios.post("http://localhost:3001/user/getaccount", {userId: this.props.logInState.user._id})
            .then(response => {
                // console.log(response);
                this.setState({
                    accounts: response.data.accounts
                })
            })
            .catch(error => {
                // console.log(error);
            })
    }

    componentDidMount(){
        this.getAccount();
    }

    fieldChange = (event)=>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        let bankDetails = {
            accountNo: this.state.accountNo,
            ifsc: this.state.ifsc,
            branch: this.state.branch,
            bankName: this.state.bankName,
            userId: this.props.logInState.user._id
        }
        this.setState({
            accountNo: "",
            ifsc: "",
            branch: "",
            bankName: "",
            error: "",
            alertType: "info"
        })
        // console.log(bankDetails);
        setHeader(localStorage.getItem('jwtToken'));
        axios.post('http://localhost:3001/user/addaccount', bankDetails)
            .then(response => {
                // console.log(response);
                this.setState({
                    error: response.data.message,
                    alertType: "info"
                })
                this.getAccount();
            })
            .catch(async error => {
                // console.log(error.toJSON());
                this.setState({
                    error: error.message+". Logging out...",
                    alertType: "danger"
                })
                await setTimeout(()=>{
                    this.props.logOut();
                }, 3000);
            })
    }

    render(){
        return(
            <div className="mt-5 p-3">
                {
                    this.state.error &&
                        <div className={"alert alert-"+this.state.alertType+" col-md-6 offset-md-3"} role={this.state.alertType} >
                            { this.state.error }
                        </div> 
                }
                {
                    this.props.logInState.isAuthenticated ?
                        <div className="container">
                            <AddAccount handleSubmit = {this.handleSubmit} state = {this.state} fieldChange = {this.fieldChange} />
                            <AccountCards accounts = {this.state.accounts} />                            
                        </div>
                        :
                        this.props.history.push("/login")   
                }
            </div>
        )
    }
}

export default Account;