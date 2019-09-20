import React, { Component } from 'react';
import { Form, Select } from '@jbuschke/formik-antd';
import { Formik } from 'formik';
import { Navigation, WizardStep } from './utils';
// import './NodeSelectionStep.css';
import api from '../../api';

const { Option } = Select;

export class NodeSelectionStep extends Component {

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    submit = () => {
        // Hack until https://github.com/jaredpalmer/formik/issues/1580 get's resolved. TODO
        setTimeout(() => this.form.submitForm(), 10);
    }

    onSubmit = (values, {setSubmitting}) => {
        this.props.onSubmit(values);
        setSubmitting(false);
    }

    render() {
        return (<>
            <div className="step-title">
                <p>En qué nodo notaste el problema</p>
            </div>
            <Formik
                ref={form => this.form = form}
                onSubmit={this.onSubmit}
                initialValues={{ node: '' }}
                enableReinitialize
            >
                {() => (
                    <Form className='form'>
                        <Form.Item name="node" htmlFor="node" label="Nodo afectado">
                            <Select name="node" id="node" showSearch
                                // validate={value => value ? '' : 'Por favor selecciona un nodo'}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {this.props.nodes.map(
                                    node => <Option key={node}>{node}</Option>
                                )}
                            </Select>
                        </Form.Item>
                    </Form>
                )}
            </Formik>
        </>
        );
    }
}

class NodeSelectionStepPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            node: null,
            nodes: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    handleSubmit(values) {
        this.setState({ node: values.node });
        this.props.onLeaveForward({ node: this.state.node });
    }

    onNext = () => {
        this.nodeSelection.submit();
    }

    async componentDidMount() {
        const account = api.account.isLogged();
        const id = account['publicKey'];
        const { node } = await api.account.get(id);
        this.setState({ node: node });
        const nodes = await api.nodes.list();
        this.setState({ nodes: nodes });
    }

    render() {
        const {node, nodes} = this.state;
        return (
            <WizardStep shouldRender={this.props.shouldRender}>
                <NodeSelectionStep ref={nodeSelection => this.nodeSelection = nodeSelection} node={node} nodes={nodes} onSubmit={this.handleSubmit} />
                <Navigation isFirst={this.props.isFirst} isLast={this.props.isLast}
                    onPrev={this.props.onLeaveBackward} onNext={this.onNext}></Navigation>
            </WizardStep>
        )
    }
}

export default NodeSelectionStepPage;
