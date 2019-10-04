import React from 'react';
import { Icon, Button } from 'antd';
import { Form, Input, Select } from "@jbuschke/formik-antd";
import { Formik } from "formik";
import { AvatarUploader } from '../utils';
import './AccountForm.css';

export function AccountForm({ handleSubmit, defaultNode, nodes, buttonMessage, initialValues}) {
    const defaultInitialValues = { name: '', node: defaultNode, 'avatar': '' }
    const mergedInitialValues = {...defaultInitialValues, ...initialValues}
    return (
        <Formik
            initialValues={mergedInitialValues}
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
            {({ setFieldValue }) => (
                <Form className="account-form">
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
                    <Form.Item name="avatar" label="Foto de Perfil" htmlFor="avatar">
                        <AvatarUploader id="avatar" imageUrl={mergedInitialValues.avatar} onChange={(blobString) => setFieldValue("avatar", blobString, false)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="account-form-button">
                            {buttonMessage}
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    );
}
