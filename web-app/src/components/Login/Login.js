import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import './Login.css';

function login(seedPhrase) {
    /*To be replaced with real login service*/
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (seedPhrase === 'notvalid') {
                reject(new Error('Tu frase secreta no es válida'));
            } else {
                resolve();
            }
        }, 400);
    });
    return promise;
}

function LoginPresentational({ handleSubmit, submitting, form }) {
    const { getFieldDecorator } = form;
    const seedPhraseDecorator = getFieldDecorator('seedPhrase', {
        rules: [{
            required: true,
            message: 'Por favor indica tu frase secreta'
        }],
    });
    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {seedPhraseDecorator(<Input.Password placeholder="Frase Secreta" />)}
            </Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={submitting}>
                Entrar
            </Button>
        </Form>
    );
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            submitting: false,
        }
    }

    onSuccess = result => {
        this.props.handleSuccess();
    }

    onFailure = (error, values) => {
        this.props.form.setFields({
            seedPhrase: {
                value: values.seedPhrase,
                errors: [error],
            },
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.setState({ submitting: true });
                login(values.seedPhrase)
                    .then(this.onSuccess)
                    .catch(error => this.onFailure(error, values))
                    .finally(() => this.setState({ submitting: false }));
            }
        });
    };

    render() {
        return(
            <LoginPresentational form={this.props.form} handleSubmit={this.handleSubmit} submitting={this.state.submitting}/>
        );
    }
}

const WrappedForm = Form.create({ name: 'log_form' })(LoginForm);
export default WrappedForm;