import React from 'react';
import {navigate} from '@reach/router';
import { Typography, Button } from 'antd';
import api from '../../api';
import "./Congrats.css";

const { Text } = Typography;

export function Congrats({ seedPhrase, username }) {
    return (
        <div className="congrats">
            <h3>Felicitaciones {username}!</h3>
            <p>Te has registrado correctamente. Esta es tu frase secreta:</p>
            <p><Text code>{seedPhrase}</Text></p>
            <p><b>Conservala</b>, la necesitarás para acceder en el futuro.</p>
            <Button type="primary" onClick={() => navigate('/')}>Continuar</Button>
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
    }

    componentDidMount() {
        const account = api.account.isLogged();
        const id = account['publicKey'];
        this.setState({seedPhrase: account['words']});
        api.account.get(id).then(
            result => {
                this.setState({
                    username: result['name'],
                })
            }).finally(
                this.setState({
                    loading:false
                })
            );
    }

    render() {
        const {seedPhrase, username} = this.state;
        return <Congrats seedPhrase={ seedPhrase } username={ username }/>
    }
}
export default CongratsPage;