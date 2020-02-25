import React from 'react';

class Transaction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            key: this.props.history.location.state.key   
        }
    }

    copyText = (event) => {
        let range = document.createRange();
        range.selectNode(document.getElementById("copy-key"));
        window.getSelection().addRange(range);
        document.execCommand("copy");
        // alert("text copied, copy in the text-area");
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.history.push("/");
    }   
    render(){
        return(
            <div className="mt-5 p-3">
                {
                    this.props.logInState.isAuthenticated && this.props.history.location.state ?
                        <div className="container">
                            <h1 align="center">Your private key</h1>
                            <br/>
                            <div className="col-md-8 offset-md-2">
                                <p align="center">
                                    <b>( Click on key to copy. )</b>
                                </p>
                                <div className="key div-wrap" id="copy-key" onClick={this.copyText}>
                                    {
                                        this.state.key.map(key => {
                                            return key+" "       
                                        })
                                    }
                                </div><br/>
                                <div className="note">
                                    <b>Note : </b><br/>
                                    <p>
                                        Please copy the following private key and store it safely. This will be helpfull for you to recover your account. <b>You cannot get your private after clicking next button.</b>
                                    </p>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-custom btn-lg pl-5 pr-5 float-right" onClick = { this.handleSubmit }>Next</button>
                            </div>
                        </div>
                        :
                        this.props.history.push("/register")   
                }
            </div>
        )
    }
}

export default Transaction;