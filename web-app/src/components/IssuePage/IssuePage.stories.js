import React from 'react';
import { storiesOf } from '@storybook/react';
import IssuePage from './IssuePage';
import {user, issue} from '../data/mockData';
import {commonIssuesDict} from '../data/commonIssues';

const largerCommonIssuePath = {
    ...issue,
    common_issue: commonIssuesDict['from_precise_moment'],
}

const nonCommonIssue = {
    ...issue,
    common_issue: null,
}

storiesOf('IssuePage', module)
    .add('Basic Issue Page', () => <IssuePage issue={issue} user={user}></IssuePage>)
    .add('Larger common issue path', () => <IssuePage issue={largerCommonIssuePath} user={user}></IssuePage>)
    .add('Non common issue selecetd', () => <IssuePage issue={nonCommonIssue} user={user}/>)
