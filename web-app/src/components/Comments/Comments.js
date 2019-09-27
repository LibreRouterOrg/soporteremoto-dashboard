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
        this.onNewComment = this.onNewComment.bind(this);
        api.socket.onComment(this.onNewComment);
    }

    onNewComment(comment) {
        console.log(comment);
        this.setState((prevState, _) => ({ comments: prevState.comments.concat(comment) }));
    }

    async componentDidMount() {
        const comments = await api.reports.getComments(this.props.issueId);
        this.setState({ comments: comments });
    }

    onChange = e => {
        this.setState({ editorValue: e.target.value });
    }

    onSubmit = e => {
        this.setState({ editorSubmitting: true });
        api.comment.create({parent:this.props.issueId, text:this.state.editorValue}).then(() =>
            this.setState({ editorSubmitting: false, editorValue: null})
        )
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
                    <CommentEditor onChange={this.onChange} onSubmit={this.onSubmit} submitting={editorSubmitting} value={editorValue} />
                </div>
            </div>
        );
    }
}

export default Comments;
