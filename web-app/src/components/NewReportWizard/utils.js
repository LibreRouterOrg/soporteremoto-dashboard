import React from 'react';
import { Button, Icon } from 'antd';
import './utils.css';

export function Navigation(props) {
    return (
        <div className="wizard-navigation">
            <Button onClick={props.onPrev} style={{ display: props.isFirst ? 'none' : 'block' }}>
                <Icon type="left" />
                Volver
            </Button>
            <Button
                onClick={props.onNext}
                className="right-button"
                disabled={props.nextDisabled}
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

export function WizardStep(props) {
    if (props.shouldRender === false) {
        return null;
    }
    return (
        <div className="wizard-step">
            {props.children}
        </div>
    );
}