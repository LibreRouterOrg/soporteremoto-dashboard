import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Login} from './Login';

const handleSubmit = action('handleSubmit');

storiesOf('Login', module)
    .add('Clean Form', () => <Login handleSubmit={handleSubmit}></Login>)
    .add('Authentication Error Form', () => <Login handleSubmit={handleSubmit} showError></Login>)