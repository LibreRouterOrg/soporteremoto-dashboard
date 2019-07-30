import React from 'react';
import { Radio } from 'antd';
import { Navigation, WizardStep } from './utils';


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
        }
        this.onNext = this.onNext.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onProblemChange = this.onProblemChange.bind(this);
        this.onSubProblemChange = this.onSubProblemChange.bind(this);
    }

    choices = [
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