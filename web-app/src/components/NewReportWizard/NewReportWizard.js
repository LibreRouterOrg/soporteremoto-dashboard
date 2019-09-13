import React, { Component } from 'react';
import { navigate } from '@reach/router';
import NodeSelectionStep from './NodeSelectionStep';
import ProblemSelectionStep from './ProblemSelectionStep';
import ProblemBodyStep from './ProblemBodyStep';
import api from '../../api';

class NewReportWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            report: {}
        }
        this.steps = [
            {
                'key': 'node_selection',
                'component': NodeSelectionStep,
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
    
    async onLeaveForward(reportUpdate) {
        await this.setState({report: {...this.state.report, ...reportUpdate}});
        let currentStep = this.state.currentStep;
        if (currentStep >= (this.steps.length - 1)) {
            api.reports.create(this.state.report).then(navigate('/'));
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
                    <step.component {...props}
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

export default NewReportWizard;