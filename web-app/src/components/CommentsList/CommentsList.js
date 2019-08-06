import React from 'react';
import { List } from 'antd';
import { Comment } from '../Comment';
import './CommentsList.css';

export function CommentsList({ comments }) {
    const sortedComments = comments.sort((x, y) => x.timestamp - y.timestamp);

    return (
        <div className="comments-list">
            <div className="comments-list-header">
                <b>Comentarios</b>
            </div>
            <div className="comments-list-content">
                {sortedComments.length > 0 ?
                    <List dataSource={sortedComments}
                        renderItem={(props) => <List.Item><Comment {...props} /></List.Item>}
                    />
                    :
                    <p>No hay comentarios</p>}
            </div>
        </div>
    );
}