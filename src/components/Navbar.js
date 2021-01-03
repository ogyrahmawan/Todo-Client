import React from 'react'
import {Navbar, Button} from 'react-bootstrap'

class NavBar extends React.Component {
    logout () {
        localStorage.clear()
        this.props.history.push('/login')
    }

    render () {
        return (
            <Navbar className="bg-dark justify-content-between text-white"> 
                <h5>TODO</h5>
                <Button onClick={() => this.logout()} >Logout</Button>
            </Navbar>
        )
    }
}

export default NavBar