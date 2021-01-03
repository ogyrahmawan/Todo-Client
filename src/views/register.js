import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import registerImage from '../assets/login-image.svg'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
          }
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount = () => {
    }
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    handleRegister(event) {
        event.preventDefault()
        axios({
            url: '/register',
            method: 'POST',
            data: {
              email: this.state.email,
              password: this.state.password
            }
          })
            .then(res => {
              Swal.fire(' Register Success')
              console.log(res.data)
              this.props.history.push('/login')
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
                      <img src={registerImage} className="login-image card-img-top img-login rounded-circle" alt="login"/>
                    </div>
                    <div className="col-5">
                      <h2>TODO</h2>
                      <Form onSubmit={this.handleRegister}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={this.handleChange} placeholder="Enter email" required />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" onChange={this.handleChange} placeholder="Password" required/>
                        </Form.Group>
                        <span>Already Have Account? <a href="/login" >Sign In</a></span><br />
                        <Button className="btn-login mt-2 " variant="dark" type="submit">
                            Register
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}
export default Register
