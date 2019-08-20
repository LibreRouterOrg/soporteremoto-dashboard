import React, { Component } from 'react';
import { Form, Input, Icon, Select, Button } from 'antd';
import './Registration.css';

class RegistrationForm extends Component {
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
        const usernameDecorator = getFieldDecorator('username', {
            rules: [{
                required: true,
                message: 'Por favor indica un nombre de usuario'
            }],
        });
        return (
            <Form onSubmit={this.handleSubmit} className="registration-form">
                <Form.Item label="Nombre de Usuario" hasFeedback>
                    {usernameDecorator(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        />,
                    )}
                </Form.Item>
                <Form.Item label="Tu Nodo" hasFeedback>
                    {getFieldDecorator('node',{})(
                        <Select showSearch defaultValue={this.props.defaultNode}
                            placeholder="Selecciona tu Nodo"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                        >
                            <Select.Option key={null}>&nbsp;</Select.Option>
                            {this.props.nodes.map(
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
        );
    }
}

const Registration = Form.create({ name: 'registration_form' })(RegistrationForm)
export default Registration;