import React from 'react';
import { List } from 'antd';
import { Comment } from '../Comment';
import './CommentsList.css';

export function CommentsList({ comments }) {
    const sortedComments = comments.sort((x, y) => x.timestamp - y.timestamp);

    return (
        <div className="comments-list">
            <b>Comentarios</b>
            <List dataSource={sortedComments}
                renderItem={(props) => <List.Item><Comment {...props} /></List.Item>}
            />
        </div>
    );
}