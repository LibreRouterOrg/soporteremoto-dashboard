import React from 'react';
import { Comment as CommentAntd, Tooltip, Input, Form, Button } from 'antd';
import { Avatar } from '../utils';
import moment from 'moment';
import api from '../../api';

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

export class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: null
        }
    }

    async componentDidMount() {
        const author = await api.account.get(this.props.userId)
        this.setState({
            author: author
        })
    }

    render() {
        const { timestamp, body } = this.props;
        const { author } = this.state;
        if (author === null) {
            return <></>
        }
        return (
            <CommentAntd
                className='comment'
                author={this.state.author.username}
                avatar={<Avatar user={this.state.author} />}
                content={<p>{body}</p>}
                datetime={<CommentDatetime timestamp={timestamp} />}
            />
        );
    }
}


export class CommentEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    async componentDidMount(){
        const keys = api.account.isLogged();
        const user = await api.account.get(keys['publicKey']);
        this.setState({user: user})
    }

    render() {
        const { onChange, onSubmit, value, submitting } = this.props;
        const { user } = this.state;
        if (!user) {
            return 'Loading';
        }
        return (
            <CommentAntd
                className='comment'
                author={user.username}
                avatar={<Avatar user={user} />}
                content={
                    <div>
                        <Form.Item>
                            <TextArea rows={4} onChange={onChange} value={value} disabled={submitting} />
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
}
