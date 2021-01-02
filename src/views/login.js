import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'


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

    render() {
        return (
            <div>
                <h1>THIS IS LOGIN PAGE</h1>
                <Form onSubmit={this.handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" />
                    </Form.Group>
                    <span>Already Have Account? <a href="/register" >Sign Up</a></span><br />
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}
export default Login