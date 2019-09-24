import React, { Component } from 'react'
import api from '../../api';

class IsOnlineWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOnline: true,
        }
    }

    updateStatus() {
        const apiStatus = api.status();
        this.setState({ isOnline: apiStatus !== 'disconnected' })
    }

    componentDidMount() {
        this.updateStatus();
        this.interval = setInterval(() => this.updateStatus(), 1000);
    }

    render() {
        return (
            <>
                {this.props.children(this.state.isOnline)}
            </>
        );
    }
}

export default IsOnlineWrapper
