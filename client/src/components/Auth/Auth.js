/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import axios from 'axios';
import store from '../../store/index';
import Toast from '../Toast/Toast';
import './Auth.css';

const baseUrl = "http://localhost:9000"

export default class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'signin',
            showToast: false
        }
    }

    signIn = () => {
        axios.get(baseUrl + '/api/users/google').then(res => {
            if (res.data.success) {
                store.dispatch({
                    type: 'login',
                    _id: res.data.user._id,
                    user: res.data.user,
                });
                this.props.history.push('/dashboard');
            } else {
                this.setState({
                    showToast: true
                });
                setTimeout(() => {
                    this.setState({showToast: false})
                }, 3000);
            }
        }).catch(er => {
            this.setState({
                showToast: true
            });
            setTimeout(() => {
                this.setState({showToast: false})
            }, 3000);
        })
    }

    signUp = () => {
        axios.get(baseUrl +'/api/users/google').then(res => {
            if (res.data.success) {
                this.setState({tab: 'signin'});
            }
        }).catch(er => {
            console.log(er);
        })
    }

    changeTab = () => {
        this.setState({
            tab: this.state.tab === 'signup' ? 'signin' : 'signup'
        });
    }

    render() {
        let page = this.state.tab === 'signin' ? <Signin signIn={this.signIn} /> : <Signup signUp={this.signUp} />
        return (
            <div className="auth-wrapper">
                <Toast model={this.state.showToast} message="Incorrect login" backgroundColor="#FF4539" />
                <div className="left">
                    <img src="https://freesvg.org/img/chemist.png" />
                </div>

                <div className="right">
                    <div className="header">Quiz itt</div>
                    <div className="sub-header">Welcome to Quiz itt</div>
                    {page}
                    <div className="new" onClick={this.changeTab}>{this.state.tab === 'signin' ? 'New to Quiz itt? Sign up here' : 'Already have an account with us? Sign in'}</div>
                </div>
            </div>
        )
    }
}