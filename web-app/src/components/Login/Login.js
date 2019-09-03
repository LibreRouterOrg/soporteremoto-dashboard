import React from 'react';
import { navigate } from '@reach/router';
import { Form, Input, Button } from 'antd';
import './Login.css';

const api = {
    account: {
        recoverAccount: async seedPhrase => {
            return {
                name: 'gferrero',
                avatar: '/some/avatar/path',
                node: 'ql-gferrero'
            }
        }
    }
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
                const promise = api.account.recoverAccount(values.seedPhrase);
                promise
                    .then(() => navigate('/'))
                    .catch((error) => {
                        this.onFailure(error, values)
                    })
                    .finally(() => this.setState({ submitting: false }));
            }
        });
    };

    render() {
        return (
            <div className="login-page">
                <LoginPresentational form={this.props.form} handleSubmit={this.handleSubmit} submitting={this.state.submitting} />
            </div>
        );
    }
}

const WrappedForm = Form.create({ name: 'log_form' })(LoginForm);
export default WrappedForm;