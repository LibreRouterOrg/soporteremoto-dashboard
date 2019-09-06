import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Registration } from './Registration';
import { Congrats } from './Congrats';

const handleSubmit = action('handleSumbit');
const handleGoToLogin = action('handleGoToLogin');
const nodes = ["ql-roxa", "ql-nicoyjesi", "ql-natiysofi", "si-silvia"];
const seedPhrase = "witch collapse practice feed shame open despair creek road again ice least";

const actions = {
    handleSubmit: handleSubmit,
    handleGoToLogin: handleGoToLogin,
}

storiesOf('Registration', module)
    .add('Default Node Roxa', () => <Registration {...actions} nodes={nodes} defaultNode="ql-roxa"></Registration>)
    .add('No default node', () => <Registration {...actions} nodes={nodes}></Registration>)
    .add('Congrats after registering', () => <Congrats seedPhrase={seedPhrase} username={'gferrero'} />)