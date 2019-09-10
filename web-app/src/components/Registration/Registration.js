import React from 'react';
import { navigate } from '@reach/router';
import { Icon, Button } from 'antd';
import { Form, Input, Select } from "@jbuschke/formik-antd";
import { Formik } from "formik";
import './Registration.css';
import api from '../../api';

export function Registration({ handleSubmit, handleGoToLogin, defaultNode, nodes }) {
    return (
        <div className="registration-page">
            <Formik
                initialValues={{ name: '', node: defaultNode }}
                enableReinitialize
                validate={values => {
                    let errors = {};
                    if (!values.name) {
                        errors.name = 'Por favor indica un nombre de usuario';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="registration-form">
                        <Form.Item name="name" hasFeedback label="Nombre de Usuario" htmlFor="name">
                            <Input id="name" name="name" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                        </Form.Item>
                        <Form.Item hasFeedback name="node" label="Tu Nodo" htmlFor="name">
                            <Select showSearch name="node"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Select.Option key={null}>--No tengo nodo--</Select.Option>
                                {nodes.map(
                                    node => <Select.Option key={node}>{node}</Select.Option>
                                )}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Registrarme
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </Formik>
            <div className="or-login">
                <p>O <Button type='link' onClick={() => handleGoToLogin()}>Ingresa con tu frase secreta</Button></p>
            </div>
        </div>
    );
}

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultNode: null,
            nodes: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
    }

    componentDidMount() {
        api.getDefaultNode().then((defaultNode) => {
            this.setState({ defaultNode: defaultNode });
        });
        api.nodes.list().then((nodes) => {
            this.setState({ nodes: nodes });
        })
    }

    handleSubmit({ name, node }) {
        api.account.createAccount({ name, node }).then(
            () => {
                navigate('/congrats', { state: { from: this.props.location.state.from } });
            }
        );
    }
    goToLogin() {
        navigate('/login', { state: { from: this.props.location.state.from } });
    }
    render() {
        const { defaultNode, nodes } = this.state
        return (
            <Registration handleSubmit={this.handleSubmit} defaultNode={defaultNode} nodes={nodes} handleGoToLogin={this.goToLogin} />
        );
    }
}
export default RegistrationPage;