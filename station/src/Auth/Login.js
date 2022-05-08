import React, { Component } from 'react';
import axios, { Axios } from 'axios';

const BaseUrl = 'http://127.0.0.1:8000/api/user/';

class Login extends Component {
  state = {
    form: []
  }

  handleChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  loginClick = async() => {
    let result = axios.post(BaseUrl).then(res => {
      this.setState({
        form: res.data
      })
    })
    
    console.log(result)
  }

  render() {
    return (
      <React.Fragment>
        <div>
            <label>Email: </label>
            <input type='email' name='email' onChange={this.handleChange} />
            <label>Password: </label>
            <input type='text' name='password' onChange={this.handleChange} />
            <br />
            <button onClick={() => this.loginClick()}>Login</button>
        </div>
      </React.Fragment>
    )
  }
}

export default Login;