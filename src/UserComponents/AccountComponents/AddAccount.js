import React from 'react';

function AddAccount(props){
    return(
        <div>
            <button type="button" className="btn btn-custom float-right" data-toggle="modal" data-target="#exampleModal">
                Link New Account
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <form onSubmit = {props.handleSubmit} method="POST">
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4">Account Number</label>
                                            <input type="text" className="form-control" name="accountNo" id="inputEmail4" placeholder="Account Number" required={true} 
                                                value = {props.state.accountNo}
                                                onChange = {props.fieldChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4">IFSC Code</label>
                                            <input type="text" className="form-control" name="ifsc" id="inputPassword4" placeholder="IFSC code" required={true} 
                                                value = {props.state.ifsc}
                                                onChange = {props.fieldChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress">Branch Name</label>
                                        <input type="text" className="form-control" name="branch" id="inputAddress" placeholder="Branch" required={true} 
                                            value = {props.state.branch}
                                            onChange = {props.fieldChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputAddress2">Bank Name</label>
                                        <input type="text" className="form-control" name="bankName" id="inputAddress2" placeholder="Bank" required={true} 
                                            value = {props.state.bankName}
                                            onChange = {props.fieldChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-custom container">Add Bank Details</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAccount;