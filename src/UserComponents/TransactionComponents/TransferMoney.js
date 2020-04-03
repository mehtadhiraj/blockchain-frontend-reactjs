import React from 'react';

function TransferMoney(props){
    return(
        <div>
            <button type="button" className="btn btn-custom float-right mb-3" data-toggle="modal" data-target="#exampleModal" disabled={props.state.button}>
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
                                <form onSubmit = {props.handleSubmit} method="POST">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Receiver Username</label>
                                            <input type="text" className="form-control" name="receiver" id="inputEmail4" placeholder="Receiver's Username" required={true} 
                                                value = {props.state.receiver}
                                                onChange = {props.fieldChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">Amount</label>
                                            <input type="number" className="form-control" name="amount" id="inputPassword4" placeholder="Amount in ₹" required={true} 
                                                value = {props.state.amount}
                                                onChange = {props.fieldChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-custom container">Transfer Money</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransferMoney;