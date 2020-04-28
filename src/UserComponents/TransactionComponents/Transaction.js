import React from 'react';
import axios from 'axios';
import { setHeader, API_URL } from "../../services/auth";
import TransferMoney from './TransferMoney';
import TransactionCards  from './TransactionCards';

class Transaction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            receiver: "",
            amount: "",
            error: "",
            alertType: "info",
            transactions: [],
            button: false
        }
    }

    getTransactions = ()=>{
        setHeader(localStorage.getItem('jwtToken'));
        axios.post(API_URL+"user/gettransaction", {userId: this.props.logInState.user._id})
            .then(response => {
                // console.log(response); 
                this.setState({
                    transactions: response.data.transactionChain.reverse()
                })
            })
            .catch(error => {
                // console.log(error);
                this.setState({
                    error: error.message,
                    alertType: "danger"
                })
            })
    }

    componentDidMount(){
        this.getTransactions();
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let transactionDetails = {
            userId: this.props.logInState.user._id,
            sender: this.props.logInState.user.username,
            receiver: this.state.receiver,
            amount: this.state.amount,
            status: "pending"
        }
        // console.log(transactionDetails);
        this.setState({
            receiver: "",
            amount: "",
            error: "Reload your page after 1 miunte. We are processing your transaction...",
            alertType: "info",
            button: true
        })
        setHeader(localStorage.getItem('jwtToken'));
        await axios.post(API_URL+"user/transaction", transactionDetails)
            .then(async response => {
                // console.log(response);
                if(response.data.status === 204){
                    this.setState({
                        error: response.data.message,
                        alertType: "danger",
                        button: false
                    })
                }else{
                    this.getTransactions();
                    this.setState({
                        error: response.data.message,
                        alertType: "success",
                        button: false
                    })
                }
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

    fieldChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className="mt-5 p-3">
                {
                    this.state.error &&
                        <div className={"alert alert-"+this.state.alertType+" col-sm-8 offset-md-2"} role={this.state.alertType} >
                            { this.state.error }
                        </div> 
                }
                {
                    this.props.logInState.isAuthenticated ?
                        <div className="container">
                            <TransferMoney handleSubmit = {this.handleSubmit} state = {this.state} fieldChange = {this.fieldChange} />
                            <TransactionCards transactions = {this.state.transactions} />
                        </div>
                        :
                        this.props.history.push("/login")   
                }
            </div>
        )
    }
}

export default Transaction;