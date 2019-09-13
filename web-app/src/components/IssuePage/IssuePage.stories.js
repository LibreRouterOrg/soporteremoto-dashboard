import React from 'react';
import { storiesOf } from '@storybook/react';
import { IssueDetail } from './IssuePage';
import { user, issue } from '../data/mockData';
import { commonIssuesDict } from '../data/commonIssues';

const largerCommonIssuePath = {
    ...issue,
    common_issue: commonIssuesDict['from_precise_moment'],
}

const nonCommonIssue = {
    ...issue,
    common_issue: null,
}

storiesOf('IssuePage', module)
    .add('Basic Issue Page', () => <IssueDetail issue={issue} user={user} author={issue.user} comments={[]}/>)
    .add('Larger common issue path', () => <IssueDetail issue={largerCommonIssuePath} user={user} author={issue.user} comments={[]}/>)
    .add('Non common issue selecetd', () => <IssueDetail issue={nonCommonIssue} user={user} author={issue.user} comments={[]}/>)
