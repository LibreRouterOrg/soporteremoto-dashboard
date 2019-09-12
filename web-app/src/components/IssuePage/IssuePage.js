import React, { Component } from 'react';
import moment from 'moment';
import Comments from '../Comments';
import { Button } from 'antd';
import Menu from './Menu';
import Status from './Status';
import { commonIssuesDict } from '../data/commonIssues';
import './IssuePage.less';

const Header = ({ issue, status, onChangeStatus }) => (
    <div className="header">
        <div className="header-info">
            <div className="header-title">
                <div className="header-back-button">
                    <Button type="link" icon="arrow-left" />
                </div>
                Reporte #{issue.id}
                <div className="header-status"><Status status={status} /></div>
            </div>
            <div className="header-subtitle">
                Por {issue.user.username} el {moment(issue.timestamp).format('LLL')}
            </div>
        </div>
        <div className="header-menu">
            <Menu status={status} onChange={onChangeStatus} />
        </div>
    </div>
);

const CommonIssueSection = ({ commonIssue }) => {
    const parentText = (commonIssue && commonIssue.parent) ?
        commonIssuesDict[commonIssue.parent].text + ' > ' : '';
    const childText = commonIssue ? commonIssue.text : 'Ninguno de los problemas conocidos';
    const issueText = parentText + childText;
    return (
        <div className="section">
            <div className="section-title">Tipo de problema</div>
            <div className="section-content">
                <div className="common-issue-text">
                    {issueText}
                </div>
            </div>
        </div>
    )
}

const BodySection = ({ body }) => (
    <div className="section">
        <div className="section-title">Detalles</div>
        <div className="section-content">{body}</div>
    </div>
);

const CommentsSection = ({ comments, user }) => (
    <div className="section">
        <Comments comments={comments} user={user}></Comments>
    </div>
);

class IssuePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.issue.comments,
            status: this.props.issue.status,
        }
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    onChangeStatus = e => {
        const status = this.state.status;
        this.setState({ status: status === 'open' ? 'closed' : 'open' });
    }

    render() {
        const { issue, user } = this.props;
        return (
            <div className="issue-page">
                <Header issue={issue} status={this.state.status} onChangeStatus={this.onChangeStatus} />
                <CommonIssueSection commonIssue={issue.common_issue} />
                <BodySection body={issue.body} />
                <CommentsSection comments={this.state.comments} user={user}></CommentsSection>
            </div>
        )
    }
}

export default IssuePage;
