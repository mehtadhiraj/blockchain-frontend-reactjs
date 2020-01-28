import React from 'react';
import axios from 'axios';
import { setHeader } from "../services/auth";

class AddAccount extends React.Component{
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
                            <h3 className="">Your linked bank accounts.</h3>
                            {
                                this.state.accounts.length > 0 ? 
                                    this.state.accounts.map(account => {
                                        return (
                                            <div className="card mb-3 mt-3" key={account.accountNo}>
                                                <h5 className="card-header"><b>Acc. no.</b> : {account.accountNo}  <span class="badge badge-primary">{account.branch+" Branch"}</span></h5>
                                                <div className="card-body">
                                                    <h5 className="card-title"><b>Bank</b> : {account.bankName}</h5>
                                                    <p className="card-text lead">
                                                        IFSC : {account.ifsc}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>
                                        <samp>We couldn't find any linked bank account. </samp>
                                        <a href="#" data-toggle="modal" data-target="#exampleModal">Add new account.</a>
                                    </div>
                            }
                            <button type="button" className="btn btn-primary float-right" data-toggle="modal" data-target="#exampleModal">
                                Link New Account
                            </button>
                            <div className="modal fade " id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add Bank Details</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="col-md-12 p-5">
                                                <form onSubmit = {this.handleSubmit} method="POST">
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputEmail4">Account Number</label>
                                                            <input type="text" className="form-control" name="accountNo" id="inputEmail4" placeholder="Account Number" required={true} 
                                                                value = {this.state.accountNo}
                                                                onChange = {this.fieldChange}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="inputPassword4">IFSC Code</label>
                                                            <input type="text" className="form-control" name="ifsc" id="inputPassword4" placeholder="IFSC code" required={true} 
                                                                value = {this.state.ifsc}
                                                                onChange = {this.fieldChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
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
                                                    </div>
                                                    <button type="submit" className="btn btn-primary container">Add Bank Details</button>
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

export default AddAccount;