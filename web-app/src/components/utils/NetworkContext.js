import React, { PureComponent } from 'react'
import api from '../../api';

export const NetworkContext = React.createContext(true);

export class NetworkContextProvider extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOnline: true,
        }
    }

    updateStatus() {
        this.setState({isOnline: api.status().general});
    }

    componentDidMount() {
        this.updateStatus();
        this.interval = setInterval(() => this.updateStatus(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <NetworkContext.Provider value={this.state.isOnline}>
                {this.props.children}
            </NetworkContext.Provider>
        );
    }
}
