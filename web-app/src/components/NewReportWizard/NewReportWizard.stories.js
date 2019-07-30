import React from 'react';
import NodeSelectionStep from './NodeSelectionStep';
import ProblemSelectionStep from './ProblemSelectionStep';
import ProblemBodyStep from './ProblemBodyStep';
import WizardReport from './NewReportWizard';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const username = 'gferrero';

const nodes = ["ql-roxa", "ql-nicoyjesi", "ql-natiysofi", "si-silvia"];
const defaultNode = ["ql-roxa"];

const onLeaveBackward = action('onLeaveBackward');
const onLeaveForward = action('onLeaveForward');
const onFinish = action('onFinish');

const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "80vh",
    width: "100%",
}

storiesOf('NewReportWizard', module)
    .addDecorator(story => <div style={wrapperStyle}>{story()}</div>)
    .add('Node Selection', () => <NodeSelectionStep isFirst nodes={nodes} defaultNode={defaultNode} onLeaveForward={onLeaveForward} onLeaveBackward={onLeaveBackward}/>)
    .add('Problem Selection', () => <ProblemSelectionStep onLeaveForward={onLeaveForward} onLeaveBackward={onLeaveBackward}/>)
    .add('Problem Body', () => <ProblemBodyStep isLast onLeaveForward={onLeaveForward} onLeaveBackward={onLeaveBackward}/>)
    .add('Interactive Wizard', () => <WizardReport nodes={nodes} defaultNode="ql-roxa" onFinish={onFinish}/>)