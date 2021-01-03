import React from 'react'

class Filter extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            filter: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange (event) {
        this.props.handleFilter(event.target.value)
    }

    render () {
        return (
            <div className="container mt-2">
                <select className="input-filter" onChange={this.handleChange}>
                    <option value="all">all</option>
                    <option value="completed">completed</option>
                    <option value="unfinished">unfinished  </option>
                </select>
            </div>
        )
    }
}

export default Filter