import axios from 'axios'
import React from 'react'
import { Table } from 'react-bootstrap'
import Swal from 'sweetalert2';
import AddTodo from '../components/AddTodo'
import EditTodo from '../components/EditTodo';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
        }
    }
    componentDidMount = () => {
        let token = localStorage.getItem('access_token')
        if(!token){
            this.props.history.push('/login')
        }
        this.fetchData()
    }

    fetchData () {
        let access_token = localStorage.getItem('access_token')
        axios({
            url: '/todos',
            method: 'Get',
            headers: {
                access_token: access_token
            }
          })
            .then(res => {
              this.setState({
                  todos: res.data
              })

            })
            .catch(err => {
            })
    }
    deleteTodo(id) {
        let access_token = localStorage.getItem('access_token')
        axios({
            url: `/todos/${id}`,
            method: 'DELETE',
            headers: {
                access_token: access_token
            }
          })
            .then(res => {
                Swal.fire('delete success')
                this.fetchData()
            })
            .catch(err => {
                console.log(err)
            })
    }
    updateTodo(id){
        console.log('update kah', id)
        let access_token = localStorage.getItem('access_token')
        axios({
            url: `/todos/${id}`,
            method: 'PATCH',
            headers: {
                access_token: access_token
            }
          })
            .then(res => {
                Swal.fire('update success')
                this.fetchData()
            })
            .catch(err => {
                console.log(err)
            })
    }

    render () {
        return (
            <div className="Home-Page">
                <AddTodo fetchData={this.fetchData}></AddTodo>
                <div className="container shadow">
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Desc</th>
                                <th>Status</th>
                                <th>Due Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map((element,index)=> (
                                    <tr key={index}>
                                        <td>{element.title}</td>
                                        <td>{element.description}</td>
                                        <td>{element.status}</td>
                                        <td>{element.due_date}</td>
                                        <td>
                                            <i onClick={() => this.deleteTodo(element.id)} className="fas fa-trash mr-2"></i>
                                            <i onClick={() => this.updateTodo(element.id)} className="fas fa-check-square mr-2"></i>
                                            <EditTodo todo={element} />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}
export default Home