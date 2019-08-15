import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Login from './Login';

const handleSumbit = action('handleSumbit');

storiesOf('Login', module)
    .add('LoginForm', () => <Login handleSubmit={handleSumbit}></Login>)