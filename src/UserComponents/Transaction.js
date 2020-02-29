import React from 'react';
import axios from 'axios';
import { setHeader } from "../services/auth";

class Transaction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            receiver: "",
            amount: "",
            error: "",
            alertType: "info",
            transactions: []
        }
    }

    getTransactions = ()=>{
        setHeader(localStorage.getItem('jwtToken'));
        axios.post("http://localhost:3001/user/gettransaction", {userId: this.props.logInState.user._id})
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

    handleSubmit = (event) => {
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
            error: "",
            alertType: ""
        })
        setHeader(localStorage.getItem('jwtToken'));
        axios.post("http://localhost:3001/user/transaction", transactionDetails)
            .then(async response => {
                // console.log(response);
                if(response.data.status === 204){
                    this.setState({
                        error: response.data.message,
                        alertType: "danger"
                    })
                }else{
                    this.getTransactions();
                    this.setState({
                        error: response.data.message,
                        alertType: "success"
                    })
                    await setTimeout(()=>{
                        this.getTransactions();
                    }, 120000);
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
                            <h3 className="mb-5">Your Transaction History.</h3>
                            {
                                this.state.transactions.length > 0 ? 
                                    this.state.transactions.map(transaction => {
                                        return (
                                            <div className="card mb-3" key={ transaction._id }>
                                                <div className="card-header">
                                                   <h5> <b> Transaction ID : </b> { transaction._id } &nbsp; <span className="badge badge-primary btn-custom">{transaction.status}</span></h5>
                                                </div>
                                                <div className="card-body">
                                                   <b>Sender : </b> {transaction.sender.username} <br/>
                                                   <b>Receiver : </b> {transaction.receiver.username} <br/>
                                                   <b>Amount : </b> {transaction.amount} <br/>
                                                   <b>Action : </b> {transaction.action} <br/>
                                                   <b>Hash :</b> {transaction.hash}
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>
                                        <samp>You have not done any transactions yet. </samp>
                                        <a href="#exampleModal" data-toggle="modal" data-target="#exampleModal">Do your first transaction.</a>
                                    </div>
                            }
                            <button type="button" className="btn btn-custom float-right mb-3" data-toggle="modal" data-target="#exampleModal">
                                Transfer Money
                            </button>
                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add Benificiary Details</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="col-md-12 p-5">
                                                <form onSubmit = {this.handleSubmit} method="POST">
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputEmail4">Receiver Username</label>
                                                            <input type="text" className="form-control" name="receiver" id="inputEmail4" placeholder="Receiver's Username" required={true} 
                                                                value = {this.state.receiver}
                                                                onChange = {this.fieldChange}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputPassword4">Amount</label>
                                                            <input type="number" className="form-control" name="amount" id="inputPassword4" placeholder="Amount in ₹" required={true} 
                                                                value = {this.state.amount}
                                                                onChange = {this.fieldChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-group">
                                                        <label htmlFor="inputAddress">Branch Name</label>
                                                        <input type="text" className="form-control" name="branch" id="inputAddress" placeholder="Branch" required={true} 
                                                            value = {this.state.branch}
                                                            onChange = {this.fieldChange}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="inputAddress2">Bank Name</label>
                                                        <input type="text" className="form-control" name="bankName" id="inputAddress2" placeholder="Bank" required={true} 
                                                            value = {this.state.bankName}
                                                            onChange = {this.fieldChange}
                                                        />
                                                    </div> */}
                                                    <button type="submit" className="btn btn-custom container">Transfer Money</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        this.props.history.push("/login")   
                }
            </div>
        )
    }
}

export default Transaction;