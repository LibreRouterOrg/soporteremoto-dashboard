import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';
import Comments from './Comments';
import { Comment, CommentEditor } from './Comment';

import gferrero_avatar from '../../assets/gferrero_avatar.jpeg';

export const user = {
    username: "gferrero",
    client: {
        ip: "192.168.1.4",
        hostname: "gf",
    },
    avatar: gferrero_avatar,
    is_bot: false,
};

const timestamp = new Date('2019-06-20T14:40:10Z').getTime();

const body = "Este es un comentario de ejemplo.";

export const comment = {
    user: user,
    timestamp: timestamp,
    body: body,
};

const comments = [
    comment,
    {
        user: { username: 'gmarcos' },
        timestamp: moment().subtract(4, 'days').toDate().getTime(),
        body: 'En respuesta al comentario de ejemplo',
    },
    {
        user: { username: 'nicop' },
        timestamp: moment().subtract(1, 'days').toDate().getTime(),
        body: 'En respuesta a la respuesta del comentario de ejemplo',
    },
];

storiesOf('Comments', module)
    .add('Single Comment', () => <Comment {...comment} />)
    .add('New Comment Editor', () => <CommentEditor {...comment} />)
    .add('List of Comments', () => <Comments comments={comments} user={user}/>)
    .add('Empty list', () => <Comments comments={[]} user={user}/>);