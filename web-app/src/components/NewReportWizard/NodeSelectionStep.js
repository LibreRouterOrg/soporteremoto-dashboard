import React, { Component } from 'react';
import { Select } from 'antd';
import { Navigation, WizardStep } from './utils';

const {Option} = Select;

class NodeSelectionStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            node: props.defaultNode,
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect = e => { this.setState({ node: e }) };

    render() {
        return (
            <WizardStep shouldRender={this.props.shouldRender}>
                <div className="step-title">
                    <p>En qué nodo notaste el problema</p>
                </div>
                <Select showSearch defaultValue={this.state.node}
                    placeholder="Selecciona un Nodo"
                    optionFilterProp="children" onChange={this.onSelect}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.props.nodes.map(
                        node => <Option key={node}>{node}</Option>
                    )}
                </Select>
                <Navigation isFirst={this.props.isFirst} isLast={this.props.isLast}
                    onPrev={this.props.onLeaveBackward} onNext={this.props.onLeaveForward}></Navigation>
            </WizardStep>
        );
    }
}

export default NodeSelectionStep;