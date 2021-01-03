import axios from 'axios'
import React from 'react'
import { Table } from 'react-bootstrap'
import Swal from 'sweetalert2';
import AddTodo from '../components/AddTodo'
import EditTodo from '../components/EditTodo';
import NavBar from '../components/Navbar'
import Filter from '../components/filter'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            filter: '',
            filterTodo: []
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.filteredTodo = this.filteredTodo.bind(this)
    }
    componentDidMount = async () => {
        let token = localStorage.getItem('access_token')
        if(!token){
            this.props.history.push('/login')
        }this.fetchData()
    }

    handleFilter = (param) => {
        this.setState({
            filter: param
        })
        this.filteredTodo(param)
    }
    filteredTodo (param) {
        let filteredTodos = this.state.todos.filter(todo => {
            if(!param|| param === 'all') {
                return todo
            } else {
                return todo.status === param
            }
        })
        this.setState({
            filterTodo: filteredTodos
        })
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
                  todos: res.data,
                  filterTodo: res.data
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
            },
            data: {
                status: 'completed'
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
    uncomplatedTodo(id){
        let access_token = localStorage.getItem('access_token')
        axios({
            url: `/todos/${id}`,
            method: 'PATCH',
            headers: {
                access_token: access_token
            },
            data: {
                status: 'unfinished '
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
    addtodoHandle = (payload) => {
        let access_token = localStorage.getItem('access_token')
        axios({
            url: '/todos',
            method: 'POST',
            data: {
                title: payload.title,
                description: payload.description,
                due_date: payload.due_date
            },
            headers: {
                access_token
            }
          })
            .then(res => {
                Swal.fire('Add ToDo Success')
                this.fetchData()
            })
            .catch(err => {
              console.log(err)
            })
    }

    editTodoHandle = (payload) => {
        let access_token = localStorage.getItem('access_token')
        axios({
            url: `/todos/${payload.id}`,
            method: 'PUT',
            data: {
                title: payload.title,
                description: payload.description,
                due_date: payload.due_date
            },
            headers: {
                access_token
            }
          })
            .then(res => {
              Swal.fire(' Edit ToDo Success')
              this.fetchData()
            })
            .catch(err => {
              console.log(err)
            })
    }
    render () {
        return (
            <div className="Home-Page">
                <NavBar history={this.props.history} />
                <AddTodo addtodoHandle={this.addtodoHandle}></AddTodo>
                <Filter handleFilter={this.handleFilter}></Filter>
                <div className="container shadow">
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Desc</th>
                                <th>Status</th>
                                <th>Due Date</th>
                                <th>Action</th>
                                <th>Done?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.filterTodo.map((element,index)=> (
                                    <tr key={index}>
                                        <td>{element.title}</td>
                                        <td>{element.description}</td>
                                        <td>{element.status}</td>
                                        <td>{element.due_date}</td>
                                        <td>
                                            <i onClick={() => this.deleteTodo(element.id)} className="btn-action fas fa-trash mr-2"></i>
                                            <EditTodo todo={element} editTodoHandle={this.editTodoHandle} />
                                        </td>
                                        <td>
                                            {
                                                element.status !== 'completed' ? 
                                                <i onClick={() => this.updateTodo(element.id)} className="btn-action fas fa-check-square"></i> 
                                                : 
                                                <i onClick={() => this.uncomplatedTodo(element.id)} className="btn-action fas fa-times"></i>
                                            }
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