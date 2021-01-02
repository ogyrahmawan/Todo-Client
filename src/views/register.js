import React from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'

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
                <h1>THIS IS Register PAGE</h1>
                <Form onSubmit={this.handleRegister}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={this.handleChange} name="email" type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <span>Already Have Account? <a href="/login" >Sign In</a></span><br />
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        )
    }
}
export default Register
