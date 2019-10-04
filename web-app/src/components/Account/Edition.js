import React, { Component } from 'react'
import { AccountForm } from './AccountForm';
import api from '../../api';
import './EditionPage.css';
import { message } from 'antd';
import { navigate } from '@reach/router';

class EditionPage extends Component {
        constructor(props) {
            super(props);
            this.state = {
                account: null,
                nodes: [],
            };
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        async componentDidMount() {
            const { publicKey } = api.account.isLogged();
            const account = await api.account.get(publicKey);
            this.setState({ account: account });
            api.nodes.list().then((nodes) => {
                this.setState({ nodes: nodes });
            })
        }

        handleSubmit({ name, node, avatar }) {
            const { publicKey } = api.account.isLogged();
            api.account.set(publicKey, { name, node, avatar }).then(
                () => {
                    message.success('Se actualizaron tus datos');
                    navigate('/');
                }
            );
        }

        render() {
            const { nodes, account } = this.state;
            const initialValues = {...account, name: account && account['username']}
            return (
                <div className="edition-page">
                    <AccountForm handleSubmit={this.handleSubmit} nodes={nodes} initialValues={initialValues}
                        buttonMessage={"Guardar"}></AccountForm>
                </div>
            )
        }
    }

export default EditionPage;
