import React from 'react';
import { navigate } from '@reach/router';
import { Input, Button } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';
import api from '../../api';

function LoginPresentational({ handleSubmit, showError }) {
    return (
        <Formik
            initialValues={{ seedPhrase: ''}}
            validate={values => {
                let errors = {};
                if (!values.seedPhrase) {
                    errors.seedPhrase = <span id='seedPhraseError'>Por favor indica tu frase secreta</span>;
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values);
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <label htmlFor="seedPhrase">Frase Secreta</label>
                    <Field id="seedPhrase" type="password" name="seedPhrase" />
                    <ErrorMessage name="seedPhrase" component="div" />
                    {showError  &&
                        <div>La frase secreta ingresada no es correcta</div>
                    }
                    <button type="submit" disabled={isSubmitting}>
                        Entrar
                    </button>
                </Form>
            )}
        </Formik>
    );
}

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showError: false,
        }
        this.handleExit = this.handleExit.bind(this);
    }

    onFailure = () => {
        this.setState({showError: true});
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
                <LoginPresentational handleSubmit={this.handleSubmit} showError={this.state.showError}/>
            </div>
        );
    }
}

export default LoginForm;