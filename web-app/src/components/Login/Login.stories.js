import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Login from './Login';

const handleSuccess = action('handleSuccess');

storiesOf('Login', module)
    .add('LoginForm', () => <Login handleSuccess={handleSuccess}></Login>)