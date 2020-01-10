import React from 'react';
import { storiesOf } from '@storybook/react';
import { SupportRequests } from './SupportRequests';
import {user} from '../data/mockData';

const supportRequests = [
    {timestamp: new Date('2019-06-24T14:40:10Z').getTime(), status: 'requestNoSent', user:user},
    {timestamp: new Date('2019-07-24T14:40:10Z').getTime(), status: 'requestSent', user: user},
];

const requestSupport = () => new Promise(res => setTimeout(() => res(), 200));

const onCancel = (key) => () => new Promise(res => setTimeout(() => res(), 200));

storiesOf('SupportRequests', module)
    .addDecorator(story => <div style={{"display":"flex", "flex":"auto","flexDirection":"column"}}>{story()}</div>)
    .add('Loading', () => <SupportRequests supportRequests={[]} loading={true} onRequestSupport={requestSupport}/>)
    .add('Empty List', () => <SupportRequests supportRequests={[]} onRequestSupport={requestSupport}/>)
    .add('Some Requests', () => <SupportRequests supportRequests={supportRequests} onRequestSupport={requestSupport} onCancel={onCancel}/>)
