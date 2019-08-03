import React from 'react';
import { storiesOf } from '@storybook/react';
import moment from 'moment';

import { comment } from '../Comment/Comment.stories';
import { CommentsList } from './CommentsList';

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

storiesOf('CommentsList', module)
    .add('List of Comments', () => <CommentsList comments={comments}/>)
    .add('Empty list', () => <CommentsList comments={[]}/>);