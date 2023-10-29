import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isChecked: false,
    errorMsg: '',
    showSubmitErr: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSucc = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFail = errMsg => {
    this.setState({showSubmitErr: true, errorMsg: errMsg})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSucc(data.jwt_token)
    } else {
      this.onSubmitFail(data.error_msg)
    }
  }

  check = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  render() {
    const {username, password, showSubmitErr, errorMsg, isChecked} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-con">
        <form className="loginCard" onSubmit={this.onFormSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="logo"
          />
          <label className="lable">
            USERNAME
            <input
              onChange={this.onChangeUsername}
              value={username}
              type="text"
              placeholder="Username"
            />
          </label>
          <label className="lable">
            PASSWORD
            <input
              onChange={this.onChangePassword}
              value={password}
              type={isChecked ? 'text' : 'password'}
              placeholder="Password"
            />
          </label>
          <label>
            <input type="checkbox" onChange={this.check} /> Show Password
          </label>

          <button type="submit" className="logBut">
            Login
          </button>
          {showSubmitErr && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
