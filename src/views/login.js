import React from 'react'

class Login extends React.Component {
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
                <h1>THIS IS LOGIN PAGE</h1>
            </div>
        )
    }
}
export default Login