import React from 'react';
import { navigate } from '@reach/router';
import { Typography, Button } from 'antd';
import api from '../../api';
import "./Congrats.css";

const { Text } = Typography;

export function Congrats({ seedPhrase, username, handleExit }) {
    return (
        <div className="congrats">
            <h3>Felicitaciones {username}!</h3>
            <p>Te has registrado correctamente. Esta es tu frase secreta:</p>
            <p><Text code>{seedPhrase}</Text></p>
            <p><b>Conservala</b>, la necesitarás para acceder en el futuro.</p>
            <div className="button-wrapper">
                <Button onClick={handleExit} type="primary">Continuar</Button>
            </div>
        </div>
    );
}

class CongratsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            seedPhrase: null,
            loading: true,
        }
        this.handleExit = this.handleExit.bind(this);
    }
    componentDidMount() {
        const account = api.account.isLogged();
        const id = account['publicKey'];
        this.setState({ seedPhrase: account['words'] });
        api.account.get(id).then(
            result => {
                this.setState({
                    username: result['name'],
                })
            }).finally(
                this.setState({
                    loading: false
                })
            );
    }
    handleExit() {
        navigate(this.props.location.state.from);
    }
    render() {
        const { seedPhrase, username } = this.state;
        return <Congrats seedPhrase={seedPhrase} username={username} handleExit={this.handleExit} />
    }
}

export default CongratsPage;