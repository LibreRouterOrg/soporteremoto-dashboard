import React from 'react';
import { Radio } from 'antd';
import { Navigation, WizardStep } from './utils';
import { commonIssues } from '../data';

const issuesTree = commonIssues
    .filter(issue => issue.parent === null)
    .map(issue => (
        {
            ...issue,
            subChoices: commonIssues.filter(x => x.parent === issue.id)
        }));
issuesTree.push({
    "id": "custom",
    "text": "Ninguno de los anteriores"
});

function Choices({ choices, onChange, selected }) {
    const radioStyle = {
        display: "flex",
        whiteSpace: "normal",
        paddingBottom: "0.5em",
    }
    return (
        <div className="choices">
            <Radio.Group onChange={onChange} value={selected}>
                {choices.map(choice =>
                    <Radio key={choice.key} style={radioStyle} value={choice}>
                        {choice.text}
                    </Radio>
                )}
            </Radio.Group>
        </div>
    );
}

class ProblemSelectionStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: null,
            subProblem: null,
            page: 0,
        };
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onProblemChange = this.onProblemChange.bind(this);
        this.onSubProblemChange = this.onSubProblemChange.bind(this);
        this.choices = issuesTree;
    }

    onPrev() {
        if (this.state.page === 1) {
            this.setState({ page: this.state.page - 1 })
        } else {
            this.props.onLeaveBackward();
        }
    }

    onNext() {
        const hasSubchoices = this.state.problem.subChoices && this.state.problem.subChoices.length > 0;
        if (this.state.page === 0 && hasSubchoices) {
            this.setState({ page: this.state.page + 1 })
        } else {
            this.props.onLeaveForward();
        }
    }

    onProblemChange = e => { this.setState({ problem: e.target.value, subProblem: null }) }
    onSubProblemChange = e => { this.setState({ subProblem: e.target.value }) }

    render() {
        let currentChoices = null;
        let choiceChange = null;
        let selected = null;
        let isValid = false;
        if (this.state.page === 0) {
            currentChoices = this.choices;
            choiceChange = this.onProblemChange;
            selected = this.state.problem;
            isValid = currentChoices.indexOf(this.state.problem) >= 0;
        } else {
            currentChoices = this.state.problem.subChoices;
            choiceChange = this.onSubProblemChange;
            selected = this.state.subProblem;
            isValid = currentChoices.indexOf(this.state.subProblem) >= 0;
        }
        return (
            <WizardStep shouldRender={this.props.shouldRender}>
                <div className="step-header">
                    <p>Cuál es el problema?</p>
                </div>
                <Choices choices={currentChoices} onChange={choiceChange} selected={selected} />
                <Navigation nextDisabled={!isValid} isFirst={this.props.isFirst} isLast={this.props.isLast} onPrev={this.onPrev} onNext={this.onNext}></Navigation>
            </WizardStep>
        );
    }
}

export default ProblemSelectionStep;