import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import loginImage from '../assets/login.png'
import { GoogleLogin } from 'react-google-login'


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
          }
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount = () => {
      let token = localStorage.getItem('access_token')
      if(token){
        this.props.history.push('/')
      }
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleLogin(event) {
        event.preventDefault()
        axios({
            url: '/login',
            method: 'POST',
            data: {
              email: this.state.email,
              password: this.state.password
            }
          })
            .then(res => {
              localStorage.setItem('access_token', res.data.access_token)
              Swal.fire(' Login Success')
              console.log(res.data)
              this.props.history.push('/')
            })
            .catch(err => {
              Swal.fire(err.request.response)
              console.log(err)
            })
    }
    responseGoogle = (response) => {
      let googleToken = response.tokenId
      axios({
        url: '/googleLogin',
        method: 'POST',
        data: {
          googleToken
        }
      })
        .then(res => {
          localStorage.setItem('access_token', res.data.access_token)
          Swal.fire(' Login Success')
          console.log(res.data)
          this.props.history.push('/')
        })
        .catch(err => {
          Swal.fire(err.request.response)
          console.log(err)
        })
      
    }
    render() {
        return (
            <div>
                <div className="container">
                  <div className="row d-flex justify-content-center align-items-center shadow-lg mt-5 mx-auto">
                    <div className="col-7">
                      <img src={loginImage} className="login-image card-img-top img-login rounded-circle" alt="login"/>
                    </div>
                    <div className="col-5">
                      <h2>TODO</h2>
                      <Form onSubmit={this.handleLogin}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" required/>
                        </Form.Group>
                        <span>Don't Have Account? <a href="/register" >Sign Up</a></span><br />
                        <Button className="btn-login mt-2 " variant="primary" type="submit">
                            Login
                        </Button>
                        <GoogleLogin
                          clientId="1078078274697-qh6v48qcjkvrd6d3lbqlkqif8ctfa3hb.apps.googleusercontent.com"
                          render={renderProps => (
                            <Button className="mt-2 ml-2  " variant="danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google Login</Button>
                            )}
                            buttonText="Login"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            />
                      </Form>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
export default Login