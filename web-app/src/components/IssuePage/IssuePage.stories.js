import React from 'react';
import { storiesOf } from '@storybook/react';
import { NavBar } from './IssuePage';
import { user, issue } from '../data/mockData';

const largerCommonIssuePath = {
    ...issue,
    commonIssueId: 'from_precise_moment',
}

const nonCommonIssue = {
    ...issue,
    commonIssueId: "custom",
    title: "Ayuda para alinear la antena de casa"
}

// storiesOf('IssuePage', module)
//     .add('Basic Issue Page', () => <IssueDetail issue={issue} user={user} author={issue.user} comments={[]}/>)
//     .add('Larger common issue path', () => <IssueDetail issue={largerCommonIssuePath} user={user} author={issue.user} comments={[]}/>)
//     .add('Non common issue selecetd', () => <IssueDetail issue={nonCommonIssue} user={user} author={issue.user} comments={[]}/>)
