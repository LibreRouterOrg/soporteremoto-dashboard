import React from 'react';
import { storiesOf } from '@storybook/react';
import gferrero_avatar from '../../assets/gferrero_avatar.jpeg';
import {Comment, CommentEditor} from './';

const user = {
    username: "gferrero",
    client: {
        ip: "192.168.1.4",
        hostname: "gf",
    },
    avatar: gferrero_avatar,
    is_bot: false,
}

const timestamp = new Date('2019-06-20T14:40:10Z').getTime()

const body = "Este es un comentario de ejemplo."

export const comment = {
    user: user,
    timestamp: timestamp,
    body: body,
}

storiesOf('Comment', module)
    .add('Basic Comment', () => <Comment {...comment}/>)
    .add('New Comment Editor', () => <CommentEditor {...comment}/>);