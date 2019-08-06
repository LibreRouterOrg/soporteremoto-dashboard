import React from 'react';
import { storiesOf } from '@storybook/react';
import IssuePage from './IssuePage';
import {issue} from '../IssueSmallResume/IssueSmallResume.stories';
import {user} from '../Comments/Comments.stories';

storiesOf('IssuePage', module)
    .add('Basic Issue Page', () => <IssuePage issue={issue} user={user}></IssuePage>)