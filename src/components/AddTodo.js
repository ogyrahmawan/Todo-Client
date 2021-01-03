import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

class AddTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            title: '',
            description: '',
            due_date: ''
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.AddTodo = this.AddTodo.bind(this)
    }
    handleChange (event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        }) 
    }

    handleClose () {
        this.setState({
            show: false
        })
    }
    handleShow () {
        this.setState({
            show: true
        })
    }
    AddTodo (event) {
        event.preventDefault()
        let payload = {
            title: this.state.title,
            description: this.state.description,
            due_date: this.state.due_date
        }
        this.props.addtodoHandle(payload)
        this.handleClose()
        
    }

    render() {
        return (
            <>
            <button className="btn-plus btn-primary" onClick={this.handleShow}>
            <i className="fas fa-plus"></i>
            </button>
      
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add New Todo</Modal.Title>
              </Modal.Header>
              <Form onSubmit={this.AddTodo}>
                <Modal.Body>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={this.handleChange} name="title" type="text" required />
                    </Form.Group>
                    <Form.Group controlId="formDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={this.handleChange} name="description" type="text" required/>
                    </Form.Group>
                    <Form.Group controlId="formDueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control onChange={this.handleChange} name="due_date" type="date" required/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" type="submit">
                    Save Changes
                    </Button>
                </Modal.Footer>
              </Form>

            </Modal>
          </>
        )
    }
}

export default AddTodo