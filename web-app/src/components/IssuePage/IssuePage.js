import React, { Component } from 'react';
import Comments from '../Comments';
import './IssuePage.css';
import moment from 'moment';

class IssuePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.issue.comments,
        }
    }

    getCommonIssuePath = commonIssue => commonIssue.text;

    render() {
        const { issue, user } = this.props;
        return (
            <div className="issue-page">
                <div className="section">
                    <div className="title">Reporte #{issue.id}</div>
                    <div className="subtitle">Por {issue.user.username} el {moment(issue.timestamp).format('LLL')}</div>
                </div>
                <div className="section">
                    <div className="title">Tipo de problema</div>
                    <div className="section-content">{this.getCommonIssuePath(issue.common_issue)}</div>
                </div>
                <div className="section">
                    <div className="title">Detalles</div>
                    <div className="section-content">{issue.body}</div>
                </div>
                <div className="section">
                    <Comments comments={this.state.comments} user={user}></Comments>
                </div>
            </div>
        )
    }
}

export default IssuePage;