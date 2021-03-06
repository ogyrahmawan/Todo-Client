import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap'

class EditTodo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            title: this.props.todo.title,
            description: this.props.todo.description,
            due_date: this.props.todo.due_date
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.editTodo = this.editTodo.bind(this)
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
    editTodo (event) {
        event.preventDefault()
        let payload = {
            id : this.props.todo.id,
            title: this.state.title,
            description: this.state.description,
            due_date: this.state.due_date
        }
        this.props.editTodoHandle(payload)
        this.handleClose()
    }

    render() {
        return (
            <>
            <i onClick={this.handleShow} className="btn-action fas fa-edit"></i>
      
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
              </Modal.Header>
              <Form onSubmit={this.editTodo}>
                <Modal.Body>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control value={this.state.title} onChange={this.handleChange} name="title" type="text" required />
                    </Form.Group>
                    <Form.Group controlId="formDesc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control value={this.state.description} onChange={this.handleChange} name="description" type="text" required/>
                    </Form.Group>
                    <Form.Group controlId="formDueDate">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control value={this.state.due_date} onChange={this.handleChange} name="due_date" type="date" required/>
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

export default EditTodo