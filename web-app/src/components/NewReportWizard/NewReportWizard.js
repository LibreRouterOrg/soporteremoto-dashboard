import React, { Component } from 'react';
import { Radio, Button, Icon, Input, Select } from 'antd';
import './NewReportWizard.css';

const { TextArea } = Input;
const { Option } = Select;

const choices = [
    {
        key: "unavailable_network",
        text: "No veo mi red wifi disponible",
    },
    {
        key: "unreachable_network",
        text: "Veo mi red wifi disponible pero no puedo conectarme",
    },
    {
        key: "unreachable_resources",
        text: "Puedo conectarme a mi red, pero tengo problemas para navegar",
        subChoices: [
            {
                key: "all_resources",
                text: "No puedo visitar ninguna página ni usar ninguna aplicación",
            },
            {
                key: "some_of_them",
                text: "Puedo visitar algunas páginas pero otras no",
            },
            {
                key: "only_by_ip",
                text: "Puedo utilizar algunas aplicaciones como whatsapp pero no puedo navegar",
            }
        ],
    },
    {
        key: "slow_connection",
        text: "Puedo navegar pero anda lento",
        subChoices: [
            {
                key: "from_precise_moment",
                text: "Empezó a andar lento en un momento puntual",
            },
            {
                key: "periodically",
                text: "Siempre me anda lento en los mismos días/horarios",
            },
            {
                key: "only_with_some_sites",
                text: "Funciona lento una página/aplicación en particular. Ej (Netflix)",
            },
        ],
    },
    {
        key: "cuts_out_connection",
        text: "Puedo navegar pero de a ratos se corta",
    },
    {
        key: "custom",
        text: "Ninguno de los anteriores",
    },
];

export class NodeSelectionStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            node: props.defaultNode,
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect = e => { this.setState({ node: e }) };

    render() {
        const selectStyle = {
            maxWidth: "10rem",
        };
        if (this.props.shouldRender === false) {
            return null;
        }
        return (
            <div className="wizard-step">
                <div className="step-header">
                    <p>En qué nodo notaste el problema</p>
                </div>
                <Select showSearch defaultValue={this.state.node}
                    style={selectStyle} placeholder="Selecciona un Nodo"
                    optionFilterProp="children" onChange={this.onSelect}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {this.props.nodes.map(
                        node => <Option key={node} value={node}>{node}</Option>
                    )}
                </Select>
                <Navigation isFirst={this.props.isFirst} isLast={this.props.isLast} onPrev={this.props.onLeaveBackward} onNext={this.props.onLeaveForward}></Navigation>
            </div>
        );
    }
}

export class ProblemSelectionStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problem: null,
            subProblem: null,
            page: 0,
        }
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onProblemChange = this.onProblemChange.bind(this);
        this.onSubProblemChange = this.onSubProblemChange.bind(this);
    }

    onPrev() {
        if (this.state.page === 1) {
            this.setState({ page: this.state.page - 1 })
        } else {
            this.props.onLeaveBackward();
        }
    }

    onNext() {
        if (this.state.page === 0 && this.state.problem.subChoices) {
            this.setState({ page: this.state.page + 1 })
        } else {
            this.props.onLeaveForward();
        }
    }

    onProblemChange = e => {this.setState({problem: e.target.value})}
    onSubProblemChange = e => {this.setState({subProblem: e.target.value})}

    render() {
        if (this.props.shouldRender === false) {
            return null;
        }
        let currentChoices = null;
        let choiceChange = null;
        let selected = null;
        if (this.state.page === 0) {
            currentChoices = choices;
            choiceChange = this.onProblemChange;
            selected = this.state.problem;
        } else {
            currentChoices = this.state.problem.subChoices;
            choiceChange = this.onSubProblemChange;
            selected = this.state.subProblem;
        }
        return (
            <div className="wizard-step">
                <div className="step-header">
                    <p>Cuál es el problema?</p>
                </div>
                <Choices choices={currentChoices} onChange={choiceChange} selected={selected} />
                <Navigation isFirst={this.props.isFirst} isLast={this.props.isLast} onPrev={this.onPrev} onNext={this.onNext}></Navigation>
            </div>
        );
    }

}

export class ProblemBodyStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: null,
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange = e => { this.setState({ body: e.target.value }) }

    render() {
        if (this.props.shouldRender === false) {
            return null;
        }
        return (
            <div className="wizard-step">
                <div className="step-header">
                    <p>Describe el problema con tus palabras</p>
                </div>
                <TextArea autoFocus={true} rows={4} value={this.state.body} onChange={this.onChange} />
                <Navigation isFirst={this.props.isFirst} isLast={this.props.isLast} onPrev={this.props.onLeaveBackward} onNext={this.props.onLeaveForward}></Navigation>
            </div>
        );
    }
}

class WizardReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
        }
        this.onLeaveForward = this.onLeaveForward.bind(this);
        this.onLeaveBackward = this.onLeaveBackward.bind(this);
        this.steps = [
            {
                'key': 'node_selection',
                'component': NodeSelectionStep,
                'props': {
                    isFirst: true,
                    nodes: this.props.nodes,
                    defaultNode: this.props.defaultNode,
                    onLeaveForward: this.onLeaveForward,
                    onLeaveBackward: this.onLeaveBackward,
                }
            },
            {
                'key': 'problem_selection',
                'component': ProblemSelectionStep,
                'props': {
                    onLeaveForward: this.onLeaveForward,
                    onLeaveBackward: this.onLeaveBackward,
                }
            },
            {
                'key': 'problem_body',
                'component': ProblemBodyStep,
                'props': {
                    isLast: true,
                    onLeaveForward: this.onLeaveForward,
                    onLeaveBackward: this.onLeaveBackward,
                }
            }
        ];
    }

    onLeaveBackward() {
        const currentStep = this.state.currentStep;
        this.setState({ currentStep: currentStep - 1 });
    }

    onLeaveForward() {
        let currentStep = this.state.currentStep;
        if (currentStep >= (this.steps.length - 1)) {
            console.log('exit succesfully');
        } else {
            this.setState({ currentStep: currentStep + 1 })
        }
    }

    render() {
        const currentStep = this.state.currentStep;
        return (
            <>
                {this.steps.map(step =>
                    <step.component {...step.props} shouldRender={this.steps.indexOf(step) === currentStep} />
                )}
            </>
        );
    }
}

// Utils
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

function Navigation(props) {
    return (
        <div className="wizard-navigation">
            <Button onClick={props.onPrev} style={{ display: props.isFirst ? 'none' : 'block' }}>
                <Icon type="left" />
                Volver
            </Button>
            <Button
                onClick={props.onNext}
                className="right-button"
                disabled={props.follow_disabled}
                style={{ display: props.isLast ? 'none' : 'block' }}>
                Continuar <Icon type="right" />
            </Button>
            <Button
                onClick={props.onNext}
                className="right-button"
                style={{ display: props.isLast ? 'block' : 'none' }}>
                Finalizar
            </Button>
        </div>
    );
}

export default WizardReport;