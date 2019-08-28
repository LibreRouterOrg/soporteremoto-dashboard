import React from 'react';
import { navigate, Link } from '@reach/router';
import { Form, Input, Icon, Select, Button } from 'antd';
import './Registration.css';
import api from '../../api';

function RegistrationForm(props) {
    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.handleSubmit(values);
            }
        });
    };
    const { getFieldDecorator } = props.form;
    const usernameDecorator = getFieldDecorator('username', {
        rules: [{
            required: true,
            message: 'Por favor indica un nombre de usuario'
        }],
    });
    return (
        <div className="registration-page">
            <Form onSubmit={handleSubmit} className="registration-form">
                <Form.Item hasFeedback>
                    {usernameDecorator(
                        <Input
                            placeholder="Nombre de Usuario"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />,
                    )}
                </Form.Item>
                <Form.Item hasFeedback>
                    {getFieldDecorator('node', {
                        initialValue: props.defaultNode,
                    })(
                        <Select showSearch
                            placeholder="Selecciona tu Nodo"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Select.Option key={null}>&nbsp;</Select.Option>
                            {props.nodes.map(
                                node => <Select.Option key={node}>{node}</Select.Option>
                            )}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Registrarme
                    </Button>
                </Form.Item>
            </Form>
            <div className="or-login">
                <p>O <Button type='link' onClick={props.goToLogin}>Ingresa con tu frase secreta</Button></p>
            </div>
        </div>
    );
}

export const Registration = Form.create({ name: 'registration_form' })(RegistrationForm)


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    handleSubmit({ username, node }) {
        api.account.createAccount({ name: username, node }).then(
            () => {
                navigate('/congrats', {state:{ from: this.props.location.state.from }});
            }
        );
    }

    goToLogin(){
        navigate('/login', {state:{from:this.props.location.state.from}});
    }

    render() {
        return (
            <Registration handleSubmit={this.handleSubmit} defaultNode='ql-roxa' nodes={['ql-roxa']} goToLogin={this.goToLogin}/>
        );
    }
}
export default RegistrationPage;