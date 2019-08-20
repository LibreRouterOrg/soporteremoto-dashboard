import React from 'react';
import { Form, Input, Button, Icon } from 'antd';
import './Login.css';

class LoginForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmit(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const seedPhraseDecorator = getFieldDecorator('seedPhrase', {
            rules: [{ required: true,
                      message: 'Por favor indica tu frase secreta'}],
        });
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {seedPhraseDecorator(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Frase Secreta"
                        /> ,
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Entrar
                </Button>
            </Form>
        );
    }
}

const Login = Form.create({ name: 'login_form' })(LoginForm)
export default Login;