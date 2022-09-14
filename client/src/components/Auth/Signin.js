import React from 'react';

export default class Signin extends React.Component {

    render() {
        return ( 
            <div className="sign-in-wrapper">
                <div className="form">
                    <div className="btn" onClick={() => this.props.signIn(this.state.email, this.state.password)}>Sign in</div> 
                </div> 
            </div>
        )
    }
}