import React from 'react';
import { Comment as CommentAntd, Tooltip } from 'antd';
import { Avatar } from '../utils';
import moment from 'moment';
import './Comment.css';


function CommentDatetime({ timestamp }) {
    return (
        <Tooltip
            title={moment(timestamp)
                .format('YYYY-MM-DD HH:mm:ss')}
        >
            <span>
                {moment(timestamp)
                    .fromNow()}
            </span>
        </Tooltip>
    );
}

export function Comment({ user, timestamp, body }) {
    return (
        <CommentAntd
            className='comment'
            author={user.username}
            avatar={<Avatar user={user} />}
            content={<p>{body}</p>}
            datetime={<CommentDatetime timestamp={timestamp}/>}
        />
    );
}