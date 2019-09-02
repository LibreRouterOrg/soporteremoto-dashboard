import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Registration from './Registration';
import {Congrats} from './Congrats';

const handleSumbit = action('handleSumbit');
const nodes = ["ql-roxa", "ql-nicoyjesi", "ql-natiysofi", "si-silvia"];
const seedPhrase = "witch collapse practice feed shame open despair creek road again ice least";

storiesOf('Registration', module)
    .add('Default Node Roxa', () => <Registration handleSubmit={handleSumbit} nodes={nodes} defaultNode="ql-roxa"></Registration>)
    .add('No default node', () => <Registration handleSubmit={handleSumbit} nodes={nodes}></Registration>)
    .add('Congrats after registering', () => <Congrats seedPhrase={seedPhrase} username={'gferrero'}/>)