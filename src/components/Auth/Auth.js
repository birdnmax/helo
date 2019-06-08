import React, {Component} from 'react';
import axios from 'axios';

class Auth extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: ''
        }
    }

    login = () => {
        axios.post('api/login', this.state)
            .then((res) => {
                if(res.data.success){
                    this.props.dispatch({
                        type: 'user',
                        payload: res.data.user
                    })
                    this.props.history.push('/Dashboard')
                }else{
                    alert('incorrect username or password')
                }
            })
    }

    register = () => {
        axios.post('api/register', this.state)
            .then((res) => {
                this.props.dispatch({
                    type: 'user',
                    payload: res.data.user
                })
                this.props.history.push('/Dashboard')
            })
    }

    render(){
        return (
            <div className='Auth'>
                <div className='auth-box'>
                    <h1>Helo</h1>
                    <div className='user-info'>
                        <p>Username:</p>
                        <input value={this.state.username}/>
                    </div>
                    <div className='user-info'>
                        <p>Password:</p>
                        <input value={this.state.password}/>
                    </div>
                    <div className='auth-buttons'>
                        <button className='main-button' onClick={this.login}>Login</button>
                        <button className='main-button' onClick={this.register}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default (Auth);