import React from 'react';
import { navigate } from '@reach/router';
import { Button, Icon } from 'antd';
import { Form, Input } from "@jbuschke/formik-antd";
import { Formik } from 'formik';
import { Avatar } from '../utils';
import './Login.less';
import api from '../../api';

export function Login({ handleSubmit }) {
    return (
        <Formik
            initialValues={{ seedPhrase: '' }}
            validate={values => {
                let errors = {};
                if (!values.seedPhrase) {
                    errors.seedPhrase = 'Por favor indica tu frase secreta';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form className='login-form'>
                    <Form.Item name="seedPhrase" label="Frase Secreta" htmlFor="seedPhrase">
                        <Input name="seedPhrase" id="seedPhrase"></Input>
                    </Form.Item>
                    <Button type="default" htmlType="submit" disabled={isSubmitting}>
                        Verificar
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export function LoginFeedBack({ verified, account, onConfirm }) {
    return(
        <div className="login-feedback">
            <div className="avatar">
                <Avatar user={account}></Avatar>
            </div>
            {verified && <>
                <p>Bienvenido de regreso {account.username}</p>
                <Button type="primary" onClick={onConfirm}>Continuar</Button> </>
            }
            {verified === false && <>
                <p><Icon type="warning" className="warning-icon"/> No hay datos sobre esta cuenta en la red.</p>
                <p>Revisa cuidadosamente la frase secreta ingresada</p>
                <Button type="primary" onClick={onConfirm}>Es correcta, Continuar</Button> </>
            }
        </div>
    )
}

class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            account: null,
            verified: null,
            seedPhrase: null,
        }
        this.handleExit = this.handleExit.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    handleExit() {
        try {
            navigate(this.props.location.state.from);
        } catch (e) {
            navigate('/');
        }
    }

    handleSubmit = values => {
        const promise = api.account.recover(values.seedPhrase);
        promise
            .then(({ account, verified }) => {
                this.setState({ account, verified, seedPhrase: values.seedPhrase})
            })
    }

    onConfirm = () => {
        if (this.state.verified) {
            console.log('verified')
            this.handleExit()
        } else {
            // Force credentials
            api.account.recover(this.state.seedPhrase, true)
                .then(() => this.handleExit())
        }
    }

    render() {
        const {account, verified} = this.state;
        return (
            <div className="login-page">
                {!verified &&
                    <Login handleSubmit={this.handleSubmit} showError={this.state.showError} />
                }
                {account &&
                    <LoginFeedBack account={account} verified={verified} onConfirm={this.onConfirm}></LoginFeedBack>
                }
            </div>
        );
    }
}

export default LoginContainer;
