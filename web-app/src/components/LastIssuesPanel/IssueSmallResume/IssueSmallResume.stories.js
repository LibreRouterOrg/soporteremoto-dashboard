import React from 'react';
import { storiesOf } from '@storybook/react';
import IssueSmallResume from './IssueSmallResume';
import { action } from '@storybook/addon-actions';
import gferrero_avatar from '../../../assets/gferrero_avatar.jpeg';
import { issue } from '../../data/mockData';

const user = {
    username: "gferrero",
    client: {
        ip: "192.168.1.4",
        hostname: "gf",
    },
    avatar: gferrero_avatar,
    is_bot: false,
}

const noavatarUser = {
    ...user,
    avatar: null,
}

const botUser = {
    username: 'automático',
    is_bot: true,
}

const longUsernameUser = {
    ...user,
    username: 'averyverylongusername',
}

const bot_issue = {
    ...issue,
    user: botUser,
    body: 'Enlace roxa-natisofi caído',
    node: null,
    common_issue:null,
}

const actions = {
    'onSelect': action('onSelect')
}

const noavatar_issue = {
    ...issue,
    user: noavatarUser,
}

const longUsernameIssue = {
    ...issue,
    user: longUsernameUser
}

storiesOf('LastIssuesPanel/IssueSmallResume', module)
    .add('A person issue', () => <IssueSmallResume issue={issue} {...actions} />)
    .add('A person issue that affects me', () => <IssueSmallResume issue={issue} affectsMe {...actions} />)
    .add('No avatar issue', () => <IssueSmallResume issue={noavatar_issue} {...actions} />)
    .add('Bot issue', () => <IssueSmallResume issue={bot_issue} {...actions} />)
    .add('Very long reporter one', () => <IssueSmallResume issue={longUsernameIssue} {...actions} />)