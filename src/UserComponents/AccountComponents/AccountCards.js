import React from 'react';

function AccountCards(props) {
    return(
        <div>
            <h3 className="">Your linked bank accounts.</h3>
            {
                props.accounts.length > 0 ? 
                    props.accounts.map(account => {
                        return (
                            <div className="card mb-3 mt-3" key={account.accountNo}>
                                <h5 className="card-header"><b>Acc. no.</b> : {account.accountNo}  <span className="badge badge-primary btn-custom">{account.branch+" Branch"}</span></h5>
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
                        <a href="#exampleModal" data-toggle="modal" data-target="#exampleModal">Add new account.</a>
                    </div>
            }
        </div>
    )
}

export default AccountCards;