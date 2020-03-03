import React from 'react';

function TransactionCards(props){
    return(
        <div>
            <h3 className="mb-5">Your Transaction History.</h3>
            {
                props.transactions.length > 0 ? 
                    props.transactions.map(transaction => {
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
        </div>
    )
}

export default TransactionCards;