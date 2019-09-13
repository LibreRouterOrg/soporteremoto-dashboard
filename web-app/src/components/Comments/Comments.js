import React, { Component } from 'react';
import { List } from 'antd';
import { Comment, CommentEditor } from './Comment';
import './Comments.css';
import api from '../../api';


class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorValue: null,
            editorSubmitting: false,
            comments: [],
        }
    }

    async componentDidMount() {
        const comments = await Promise.all(this.props.commentsIds.map(id => api.comments.get(id)));
        this.setState({ comments: comments });
    }

    onChange = e => {
        this.setState({ editorValue: e.target.value });
    }

    onSubmit = e => {
        this.setState({ editorSubmitting: true });
        const newComment = {
            body: this.state.editorValue,
        };
        this.props.onCommentAdd(newComment).then((comment) => {
            this.setState({
                comments: this.state.comments.concat([comment]),
                editorValue: null,
                editorSubmitting: false
            });
        });
    }

    render() {
        const { editorValue, editorSubmitting, comments } = this.state;
        const sortedComments = comments.sort((x, y) => x.timestamp - y.timestamp);
        return (
            <div className="comments-list" >
                <div className="comments-list-header">Comentarios</div>
                <div className="comments-list-content">
                    {sortedComments.length > 0 ?
                        <List dataSource={sortedComments}
                            renderItem={(props) => <List.Item><Comment {...props} /></List.Item>}
                        />
                        :
                        <p>No hay comentarios</p>}
                </div>
                <div className="comments-list-header"> Haz un comentario </div>
                <div className="comments-list-content">
                    <CommentEditor user={this.props.user} onChange={this.onChange} onSubmit={this.onSubmit} submitting={editorSubmitting} value={editorValue} />
                </div>
            </div>
        );
    }
}

export default Comments;
