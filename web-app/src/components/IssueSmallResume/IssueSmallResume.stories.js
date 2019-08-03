import React from 'react';
import { storiesOf } from '@storybook/react';
import IssueSmallResume from './IssueSmallResume';
import { action } from '@storybook/addon-actions';
import gferrero_avatar from '../../assets/gferrero_avatar.jpeg';
import { commonIssues } from '../data';

// timestamp: number,
// user: string,
// status: enum,
// node: node,
// common_issue: common_issue, 
// body: string,
// comments: Array(comment)

const commonIssuesDict = commonIssues.reduce(
    (obj, item) => {
        obj[item.id] = item;
        return obj
    }, {});

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

export const issue = {
    timestamp: new Date('2019-06-20T14:40:10Z').getTime(),
    user: user,
    status: 'open',
    node: 'ql-gferrero',
    common_issue: commonIssuesDict['unreachable_network'],
    body: '',
    comments: [],
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

const closedIssue = {
    ...issue,
    status: "closed"
}

storiesOf('IssueSmallResume', module)
    .add('A person issue', () => <IssueSmallResume issue={issue} {...actions} />)
    .add('A person issue that affects me', () => <IssueSmallResume issue={issue} affectsMe {...actions} />)
    .add('No avatar issue', () => <IssueSmallResume issue={noavatar_issue} {...actions} />)
    .add('Bot issue', () => <IssueSmallResume issue={bot_issue} {...actions} />)
    .add('Very long reporter one', () => <IssueSmallResume issue={longUsernameIssue} {...actions} />)
    .add('Closed issue', () => <IssueSmallResume issue={closedIssue} {...actions} />)