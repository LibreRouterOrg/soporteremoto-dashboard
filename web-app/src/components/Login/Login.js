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

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Porfavor indica tu nombre de usuario!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Usuario"
                        />,
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Entrar
                </Button>
            </Form>
        );
    }
}

const Login = Form.create({name:'login_form'})(LoginForm)
export default Login;