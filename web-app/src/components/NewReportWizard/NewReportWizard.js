import React, { Component } from 'react';

import NodeSelectionStep from './NodeSelectionStep';
import ProblemSelectionStep from './ProblemSelectionStep';
import ProblemBodyStep from './ProblemBodyStep';

class WizardReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
        }
        this.steps = [
            {
                'key': 'node_selection',
                'component': NodeSelectionStep,
                'props': {
                    nodes: this.props.nodes,
                    defaultNode: this.props.defaultNode,
                }
            },
            {
                'key': 'problem_selection',
                'component': ProblemSelectionStep,
            },
            {
                'key': 'problem_body',
                'component': ProblemBodyStep,
            }
        ];
        this.onLeaveForward = this.onLeaveForward.bind(this);
        this.onLeaveBackward = this.onLeaveBackward.bind(this);
    }

    onLeaveBackward() {
        const currentStep = this.state.currentStep;
        this.setState({ currentStep: currentStep - 1 });
    }

    onLeaveForward() {
        let currentStep = this.state.currentStep;
        if (currentStep >= (this.steps.length - 1)) {
            this.props.onFinish();
        } else {
            this.setState({ currentStep: currentStep + 1 })
        }
    }

    render() {
        const currentStep = this.state.currentStep;
        const props = {
            onLeaveForward: this.onLeaveForward,
            onLeaveBackward: this.onLeaveBackward,
        }
        return (
            <>
                {this.steps.map((step, index) =>
                    <step.component {...step.props} {...props}
                        key={step.key}
                        shouldRender={index === currentStep}
                        isFirst={index === 0}
                        isLast={index === this.steps.length - 1}
                    />
                )}
            </>
        );
    }
}

export default WizardReport;