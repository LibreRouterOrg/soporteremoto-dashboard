import React from 'react';
import { storiesOf } from '@storybook/react';
import IssuePage from './IssuePage';
import {user, issue} from '../data/mockData';

storiesOf('IssuePage', module)
    .add('Basic Issue Page', () => <IssuePage issue={issue} user={user}></IssuePage>)