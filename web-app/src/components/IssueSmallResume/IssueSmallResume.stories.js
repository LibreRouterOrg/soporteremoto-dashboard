import React from 'react';
import { storiesOf } from '@storybook/react';
import IssueSmallResume from './IssueSmallResume';
import { action } from '@storybook/addon-actions';
import Readme from './IssueSmallResume.md'

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
    reporter: 'german',
    is_bot: false,
    status: 'open',
    affected_nodes: affected_nodes,
    affected_groups: affected_groups,
    watchers: watchers,
    date: '2019-06-20T14:40:10-03',
}

const closed_issue = {
    ...issue, status: 'closed'
}

const bot_issue = {
    ...issue,
    title: 'Enlace roxa-natisofi caído',
    reporter: 'Proceso automático del sistema',
    is_bot: true,
    node: null,
}

const actions = {
    'onSelect': action('onSelect')
}

storiesOf('IssueSmallResume', module)
    .addParameters({
        readme: {
            codeTheme: 'duotone-sea',
            sidebar: Readme,
        },
    })
    .addDecorator(story => <div style={{ width: '640px', padding: '3rem' }}>{story()}</div>)
    .add('A person issue', () => <IssueSmallResume issue={issue} {...actions} />)
    .add('Closed issue', () => <IssueSmallResume issue={closed_issue} {...actions} />)
    .add('Bot issue', () => <IssueSmallResume issue={bot_issue} {...actions} />)