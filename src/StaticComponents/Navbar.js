import React from 'react';
import { Link } from "react-router-dom";

function Navbar(props){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
            <a className="navbar-brand" href="/">Pay Secure</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                        {/* <a className="nav-link" href="/">About</a> */}
                    </li>
                    {props.isAuthenticated ?  
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/addaccount">Bank Details</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/transaction">Transaction</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li> 
                            <li className="nav-item">
                                <Link className="nav-link" to="/login" onClick = {props.logOut}>Logout</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li> 
                        </>    
                            : 
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                                {/* <a className="nav-link" href="/">Login</a> */}
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                                {/* <a className="nav-link" href="/">Register</a> */}
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;