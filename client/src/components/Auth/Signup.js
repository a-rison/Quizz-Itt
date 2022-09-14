import React from 'react';

export default class Signup extends React.Component {

    render() {
        return (
            <div className="sign-in-wrapper">
                <div className="form">
                    <div className="btn" onClick={() => this.props.signUp({ ...this.state })}>Sign Up</div>
                </div>
            </div>
        )
    }
}