import React from 'react';
import { Comment as CommentAntd, Tooltip, Input, Form, Button } from 'antd';
import { Avatar } from '../utils';
import moment from 'moment';

const { TextArea } = Input;

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
            datetime={<CommentDatetime timestamp={timestamp} />}
        />
    );
}


export function CommentEditor ({user, onChange, onSubmit, value, submitting}) {
    return(
        <CommentAntd
            className='comment'
            author={user.username}
            avatar={<Avatar user={user} />}
            content={
                <div>
                    <Form.Item>
                        <TextArea rows={4} onChange={onChange} value={value} disabled={submitting}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                            Agregar Comentario
                        </Button>
                    </Form.Item>
                </div>
            } />
    );
}