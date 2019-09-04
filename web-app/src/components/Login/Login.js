import React from 'react';
import { navigate } from '@reach/router';
import { Input, Button } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './Login.css';
import api from '../../api';

function LoginPresentational({ handleSubmit }) {
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
    }

    onFailure = () => {
        this.setState({showError: true});
    }

    handleSubmit = values => {
        const promise = api.account.recoverAccount(values.seedPhrase);
        promise
            .then(() => navigate('/'))
            .catch(() => {
                this.onFailure()
            });
    }

    render() {
        return (
            <div className="login-page">
                <LoginPresentational handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default LoginForm;