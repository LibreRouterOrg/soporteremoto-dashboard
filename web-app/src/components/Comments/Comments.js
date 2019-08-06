import React, { Component } from 'react';
import { List } from 'antd';
import { Comment, CommentEditor } from './Comment';
import './Comments.css';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            submitting: false,
            comments: this.props.comments,
        }
    }

    onChange = e => {
        this.setState({ value: e.target.value });
    }

    onSubmit = e => {
        this.setState({ submitting: true });
        setTimeout(() => {
            const newComment = {
                user: this.props.user,
                body: this.state.value,
                timestamp: new Date().getTime(),
            };
            this.setState({ comments: this.state.comments.concat(newComment) });
            this.setState({ submitting: false });
            this.setState({ value: null });
        }, 500);
    }

    render () {
        const {value, submitting, comments} = this.state;
        const sortedComments = comments.sort((x, y) => x.timestamp - y.timestamp);
        return(
            <div className = "comments-list" >
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
                    <CommentEditor user={this.props.user} onChange={this.onChange} onSubmit={this.onSubmit} submitting={submitting} value={value}/>
                </div>
            </div>
        );
    }
}

export default Comments;