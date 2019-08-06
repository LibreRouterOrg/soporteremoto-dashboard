import React, { Component } from 'react';
import { Comment as CommentAntd, Tooltip, Input, Form, Button } from 'antd';
import { Avatar } from '../utils';
import moment from 'moment';
import './Comment.css';

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

function Editor({ onChange, onSubmit, submitting, value }) {
    return (
        <div>
            <Form.Item>
                <TextArea rows={4} onChange={onChange} value={value} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </div>
    );
}

export class CommentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            submitting: false,
        }
    }

    onChange = e => {
        this.setState({ value: e.target.value });
    }

    onSubmit = e => {
        this.setState({ submitting: true });
        setTimeout(() => {
            this.setState({ submitting: false });
            this.setState({ value: null });
        }, 500);
    }

    render() {
        const { submitting, value } = this.state;
        return (
            <CommentAntd
                className='comment'
                author={this.props.user.username}
                avatar={<Avatar user={this.props.user} />}
                content={
                    <div>
                        <Form.Item>
                            <TextArea rows={4} onChange={this.onChange} value={value} disabled={submitting}/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} onClick={this.onSubmit} type="primary">
                                Agregar Comentario
                            </Button>
                        </Form.Item>
                    </div>
                } />
        );
    }
}