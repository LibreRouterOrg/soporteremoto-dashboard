import React from 'react';
import { navigate } from '@reach/router';
import { Button } from 'antd';
import './Registration.less';
import api from '../../api';
import { NetworkContext } from '../utils';
import { AccountForm } from './AccountForm';

const OfflineRegistration = () => (
    <div className="registration-page registration-page-offline">
        <h3>Bienvenido!</h3>
        <p>Lamentablemente estás desconectado de la red de Soporte Remoto.</p>
        <p>Verifica que estás conectado a tu Red Wifi.</p>
    </div>
);

const GoToLogin = ({ handleGoToLogin }) => (
    <div className="or-login">
        <p>O <Button type='link' onClick={() => handleGoToLogin()}>Ingresa con tu frase secreta</Button></p>
    </div>
);

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultNode: null,
            nodes: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGoToLogin = this.handleGoToLogin.bind(this);
    }

    componentDidMount() {
        api.nodes.getDefaultNode().then((defaultNode) => {
            this.setState({ defaultNode: defaultNode });
        });
        api.nodes.list().then((nodes) => {
            this.setState({ nodes: nodes });
        })
    }

    handleSubmit({ name, node, avatar }) {
        api.account.createAccount({ name, node, avatar }).then(
            () => {
                navigate('/congrats', { state: { from: this.props.location.state.from } });
            }
        );
    }

    handleGoToLogin() {
        navigate('/login', { state: { from: this.props.location.state.from } });
    }

    render() {
        const { defaultNode, nodes } = this.state
        return (
            <NetworkContext.Consumer>
                {isOnline =>
                    isOnline ?
                        <div className="registration-page">
                            <AccountForm handleSubmit={this.handleSubmit} defaultNode={defaultNode}
                                nodes={nodes} buttonMessage={"Registrarme"} />
                            <GoToLogin handleGoToLogin={this.handleGoToLogin} />
                        </div>
                        :
                        <OfflineRegistration />
                }
            </NetworkContext.Consumer>
        );
    }
}
export default RegistrationPage;
