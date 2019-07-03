import React from 'react';
import { storiesOf } from '@storybook/react';
import IssueSmallResume from './IssueSmallResume';
import { action } from '@storybook/addon-actions';
import Readme from './IssueSmallResume.md';
import gferrero_avatar from '../../assets/gferrero_avatar.jpeg';

const affected_nodes = [
    'cesarylucia',
    'q-ale',
    'q-roxa'
]

const affected_groups = [
    'quintana'
]

const watchers = [
    'cesarylucia',
    'ale'
]

const issue = {
    id: 143,
    title: 'Conexión Lenta',
    node: 'q-roxa',
    reporter: 'gferrero',
    is_bot: false,
    status: 'open',
    affected_nodes: affected_nodes,
    affected_groups: affected_groups,
    watchers: watchers,
    date: '2019-06-20T14:40:10-03',
    avatarSrc: gferrero_avatar,
    affect_current_user: false
}

const closed_issue = {
    ...issue, status: 'closed'
}

const bot_issue = {
    ...issue,
    title: 'Enlace roxa-natisofi caído',
    reporter: 'automático',
    is_bot: true,
    node: null,
}

const actions = {
    'onSelect': action('onSelect')
}

const noavatar_issue = {
    ...issue,
    avatarSrc: null,
}

const affect_current_user_issue = {
    ...issue,
    affect_current_user: true
}

const very_long_title_issue = {
    ...issue,
    title: "Este es un título muy muy largo "
}

storiesOf('IssueSmallResume', module)
    .addParameters({
        readme: {
            codeTheme: 'duotone-sea',
            sidebar: Readme,
        },
    })
    .addDecorator(story => <div style={{ width: '480px', padding: '3rem' }}>{story()}</div>)
    .add('A person issue', () => <IssueSmallResume issue={issue} {...actions} />)
    .add('A person issue that affects me', () => <IssueSmallResume issue={affect_current_user_issue} {...actions} />)
    .add('No avatar issue', () => <IssueSmallResume issue={noavatar_issue} {...actions} />)
    .add('Bot issue', () => <IssueSmallResume issue={bot_issue} {...actions} />)
    .add('Very long title one', () => <IssueSmallResume issue={very_long_title_issue} {...actions} />)