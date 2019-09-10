import React, {Component} from 'react';
import { Input } from 'antd';
import { WizardStep, Navigation } from './utils';

const {TextArea} = Input;

export class ProblemBodyStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: null,
        }
        this.onChange = this.onChange.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    onChange = e => { this.setState({ body: e.target.value }) }

    onNext() {
        this.props.onLeaveForward({body: this.state.body});
    }

    render() {
        return (
            <WizardStep shouldRender={this.props.shouldRender}>
                <div className="step-title">
                    <p>Describe el problema con tus palabras</p>
                </div>
                <TextArea autoFocus={true} rows={4} value={this.state.body} onChange={this.onChange} />
                <Navigation isFirst={this.props.isFirst} isLast={this.props.isLast} onPrev={this.props.onLeaveBackward} onNext={this.onNext}></Navigation>
            </WizardStep>
        );
    }
}

export default ProblemBodyStep;