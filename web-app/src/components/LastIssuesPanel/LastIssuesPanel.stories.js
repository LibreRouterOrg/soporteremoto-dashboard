import React from 'react';
import {LastIssuesPanel} from './LastIssuesPanel';
import { storiesOf } from '@storybook/react';
import { issue } from '../data/mockData';
import { commonIssuesDict } from '../data';

const emptyIssuesList = [];

const openAndClosedIssues = [
    { ...issue, common_issue: commonIssuesDict['cuts_out_connection'], timestamp: new Date('2019-06-24T14:40:10Z').getTime() },
    { ...issue, user: { username: 'chana' }, common_issue: commonIssuesDict['only_with_some_sites'], timestamp: new Date('2019-06-26T14:40:10Z').getTime() },
    { ...issue, user: { username: 'ale' }, common_issue: commonIssuesDict["only_by_ip"], timestamp: new Date('2019-06-25T14:40:10Z').getTime() },
    { ...issue, user: { username: 'sofi' }, common_issue: commonIssuesDict["from_precise_moment"], timestamp: new Date('2019-06-23T14:40:10Z').getTime() },
    { ...issue, user: { username: 'lalo' }, common_issue: commonIssuesDict["unavailable_network"], timestamp: new Date('2019-06-21T14:40:10Z').getTime() },
    { ...issue, user: { username: 'jesi' }, status: 'closed', common_issue: commonIssuesDict["all_resources"], timestamp: new Date('2019-06-21T14:40:10Z').getTime() },
    { ...issue, user: { username: 'nati' }, status: 'closed', common_issue: commonIssuesDict["only_with_some_sites"], timestamp: new Date('2019-06-14T14:40:10Z').getTime() }
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