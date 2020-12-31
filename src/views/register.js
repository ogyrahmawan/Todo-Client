import React from 'react'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
          }
    }
    componentDidMount = () => {
    }

    render() {
        return (
            <div>
                <h1>THIS IS Register PAGE</h1>
            </div>
        )
    }
}
export default Register
