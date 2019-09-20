import React, { Component } from 'react';
import { navigate } from '@reach/router';
import NodeSelectionStep from './NodeSelectionStep';
import ProblemSelectionStep from './ProblemSelectionStep';
import ProblemDescriptionStep from './ProblemDescriptionStep';
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
                'key': 'problem_description',
                'component': ProblemDescriptionStep,
                'props': [
                    {
                        key: 'isCustomIssue',
                        callback: () => this.state.report.common_issue && this.state.report.common_issue.id === "custom",
                    }
                ]
            }
        ];
        this.onLeaveForward = this.onLeaveForward.bind(this);
        this.onLeaveBackward = this.onLeaveBackward.bind(this);
    }

    getStepProps(propsCallbacks = []) {
        return propsCallbacks.reduce((x, prop) => {x[prop.key] = prop.callback(); return x}, {});
    }

    onLeaveBackward() {
        const currentStep = this.state.currentStep;
        this.setState({ currentStep: currentStep - 1 });
    }

    onLeaveForward(reportUpdate) {
        const currentStep = this.state.currentStep;
        const reportUpdated = { ...this.state.report, ...reportUpdate }
        if (currentStep >= (this.steps.length - 1)) {
            api.reports.create(reportUpdated).then(navigate('/'));
        } else {
            this.setState({ report: reportUpdated, currentStep: currentStep + 1 });
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
                    <step.component {...props} {...this.getStepProps(step.props)}
                        key={step.key}
                        shouldRender={index === currentStep}
                        isFirst={index === 0}
                        isLast={index === this.steps.length - 1}
                        report={this.state.report}
                    />
                )}
            </>
        );
    }
}

export default NewReportWizard;
