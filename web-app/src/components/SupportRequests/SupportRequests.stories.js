import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { SupportRequestsPure } from './SupportRequests';
import {user} from '../data/mockData';

const supportRequests = [
    {timestamp: new Date('2019-06-24T14:40:10Z').getTime(), status: 'requestNoSent', user:user},
    {timestamp: new Date('2019-07-24T14:40:10Z').getTime(), status: 'requestSent', user: user},
];

const requestSupport = action('requestSupport');

storiesOf('SupportRequests', module)
    .addDecorator(story => <div style={{"display":"flex", "flex":"auto","flexDirection":"column"}}>{story()}</div>)
    .add('Loading', () => <SupportRequestsPure supportRequests={[]} loading={true} requestSupport={requestSupport}/>)
    .add('Submitting', () => <SupportRequestsPure supportRequests={[]} requestSupport={requestSupport} submitting={true}/>)
    .add('Empty List', () => <SupportRequestsPure supportRequests={[]} requestSupport={requestSupport}/>)
    .add('Some Requests', () => <SupportRequestsPure supportRequests={supportRequests} requestSupport={requestSupport}/>)
