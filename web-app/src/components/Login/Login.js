import React from 'react';
import { navigate } from '@reach/router';
import { Button, Alert } from 'antd';
import { Form, Input} from "@jbuschke/formik-antd";
import { Formik } from 'formik';
import './Login.css';
import api from '../../api';

export function Login({ handleSubmit, showError }) {
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
                    {showError &&
                        <Alert type="error" message="La frase secreta ingresada no es correcta"/>
                    }
                    <Form.Item name="seedPhrase" label="Frase Secreta" htmlFor="seedPhrase">
                        <Input.Password name="seedPhrase" id="seedPhrase"></Input.Password>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                        Entrar
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

class LoginContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showError: false,
        }
        this.handleExit = this.handleExit.bind(this);
    }

    onFailure = () => {
        this.setState({ showError: true });
    }

    handleExit() {
        try {
            navigate(this.props.location.state.from);
        } catch (e) {
            navigate('/');
        }
    }

    handleSubmit = values => {
        const promise = api.account.recoverAccount(values.seedPhrase);
        promise
            .then(() => this.handleExit())
            .catch(() => {
                this.onFailure()
            });
    }

    render() {
        return (
            <div className="login-page">
                <Login handleSubmit={this.handleSubmit} showError={this.state.showError} />
            </div>
        );
    }
}

export default LoginContainer;