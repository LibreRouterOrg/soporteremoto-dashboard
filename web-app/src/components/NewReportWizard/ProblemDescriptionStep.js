import React, { Component } from 'react';
import { Formik } from 'formik';
import { Form, Input } from '@jbuschke/formik-antd';
import { WizardStep, Navigation } from './utils';

const { TextArea } = Input;

class ProblemDescriptionForm extends Component {
    constructor(props){
        super(props);
        this.form = null // will hold the reference to formik form
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    submit = () => {
        // Hack until https://github.com/jaredpalmer/formik/issues/1580 get's resolved. TODO
        setTimeout(() => this.form.submitForm(), 10);
    }

    handleSubmit = (values, {setSubmitting}) => {
        this.props.handleSubmit(values);
        setSubmitting(false);
    }

    render() {
        const {isCustomIssue} = this.props;
        return (
            <Formik
                ref={form => this.form = form}
                onSubmit={this.handleSubmit}
                initialValues={{ title: null, body: null }}
                enableReinitialize>
            {() => (
                <Form name="asd">
                    {isCustomIssue && <p> Tu problema no estaba entre las opciones, elige un título descriptivo para identificarlo</p>}
                    {isCustomIssue && 
                            <Form.Item name="title" htmlFor="title" label="Título">
                                <Input name="title" id="title" maxLength={40}
                                    validate={value => (!value && isCustomIssue) ? 'Por favor elige un título': ''}
                                />
                            </Form.Item>
                    }
                    <p> Si quieres, puedes contar más detalles del problema </p>
                    <Form.Item name="body" htmlFor="body" label="Descripción detallada">
                        <TextArea name="body" id="body" rows={4}/>
                    </Form.Item>
                </Form>
            )}
            </Formik>
        );
    }
}

class ProblemDescriptionStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: null,

        }
        this.form = null // will hold a reference
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    onNext() {
        this.form.submit();
    }

    handleSubmit({ title, body }) {
        this.props.onLeaveForward({ title, body })
    }

    render() {
        return (
            <WizardStep shouldRender={this.props.shouldRender}>
                <ProblemDescriptionForm ref={node => this.form = node} isCustomIssue={this.props.isCustomIssue} handleSubmit={this.handleSubmit} />
                <Navigation isFirst={this.props.isFirst} isLast={this.props.isLast} onPrev={this.props.onLeaveBackward} onNext={this.onNext}></Navigation>
            </WizardStep>
        );
    }

}
export default ProblemDescriptionStep;
