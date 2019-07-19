import React from 'react';
import LastIssuesPanel from '.';
import { storiesOf } from '@storybook/react';
import { issue, actions } from '../IssueSmallResume/IssueSmallResume.stories';

const emptyIssuesList = [];

const openAndClosedIssues = [
    { ...issue, title: 'Necesito cortar el árbol', date: '2019-06-24T14:40:10-03'},
    { ...issue, reporter: 'chana', title: 'No tengo luz en casa', date: '2019-06-26T14:40:10-03'},
    { ...issue, reporter: 'ale', title: 'Se corta a cada rato', date: '2019-06-25T14:40:10-03'},
    { ...issue, reporter: 'sofi', title: 'No tengo internet desde hace un mes', date: '2019-06-23T14:40:10-03'},
    { ...issue, reporter: 'lalo', title: 'Solo me funciona whatsapp', date: '2019-06-21T14:40:10-03'},
    { ...issue, reporter: 'jesi', status: 'closed', title: 'Se me quemó el router', date: '2019-06-21T14:40:10-03'},
    { ...issue, reporter: 'nati', status: 'closed', title: 'No tengo internet, ayudaa porfavoor', date: '2019-06-1T14:40:10-03'}
];

const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    width: "100%",
}

storiesOf('LastIssuesPanel', module)
    .addDecorator(story => <div style={wrapperStyle}>{story()}</div>)
    .add('Empty List', () => <LastIssuesPanel issues={emptyIssuesList} />)
    .add('Open and Closed Issues', () => <LastIssuesPanel issues={openAndClosedIssues} />)