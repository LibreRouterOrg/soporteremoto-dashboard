import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { IssueContext, Issue } from './IssuePage';
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

const changeStatus = action('changeStatus');

const IssueContextProvider = ({ issue, children }) => (
    <IssueContext.Provider value={{ issue: issue, changeStatus: changeStatus }}>
        {children}
    </IssueContext.Provider>
)

storiesOf('IssuePage', module)
    .add('Basic Issue Page', () => (
        <IssueContextProvider issue={issue}>
            <Issue issueId={issue.id}></Issue>
        </IssueContextProvider>)
    )
    .add('Larger common issue path', () => (
        <IssueContextProvider issue={largerCommonIssuePath}>
            <Issue issueId={largerCommonIssuePath.id}></Issue>
        </IssueContextProvider>)
    )
    .add('Non common issue selecetd', () => (
        <IssueContextProvider issue={nonCommonIssue}>
            <Issue issueId={nonCommonIssue.id}></Issue>
        </IssueContextProvider>)
    )
