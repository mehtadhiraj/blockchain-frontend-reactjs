import React from 'react';

class Home extends React.Component{
    render(){
        return(
            <div>
                {
                    this.props.logInState.isAuthenticated ?
                        <div>
                            <h1>
                                Welcome {this.props.logInState.user.name}
                            </h1>
                        </div>     
                        :
                        this.props.history.push('/login')
                }
            </div>
            
        )
    }

}

export default Home;