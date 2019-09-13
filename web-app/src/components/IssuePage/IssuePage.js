import React, { Component } from 'react';
import { Redirect } from '@reach/router';
import moment from 'moment';
import Comments from '../Comments';
import { Button } from 'antd';
import Menu from './Menu';
import Status from './Status';
import { commonIssuesDict } from '../data/commonIssues';
import './IssuePage.less';
import api from '../../api';


const Header = ({ issue, onChangeStatus }) => (
    <div className="header">
        <div className="header-info">
            <div className="header-title">
                <div className="header-back-button">
                    <Button type="link" icon="arrow-left" />
                </div>
                Reporte #{issue.id}
                <div className="header-status"><Status status={issue.status} /></div>
            </div>
            <div className="header-subtitle">
                Por {issue.user.username} el {moment(issue.timestamp).format('LLL')}
            </div>
        </div>
        <div className="header-menu">
            <Menu status={issue.status} onChange={onChangeStatus} />
        </div>
    </div>
);


const CommonIssueSection = ({ commonIssueId }) => {
    const commonIssue = commonIssuesDict[commonIssueId];
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

const CommentsSection = ({ comments, user, onCommentAdd }) => (
    <div className="section">
        <Comments commentsIds={comments} onCommentAdd={onCommentAdd} user={user} />
    </div>
);

export const IssueDetail = ({ issue, user, comments, onCommentAdd, onChangeStatus, loading }) => {
    if (loading) {
        return 'Cargando...'
    }
    return (
        <div className="issue-page">
            <Header issue={issue} onChangeStatus={onChangeStatus} />
            <CommonIssueSection commonIssueId={issue.common_issue} />
            <BodySection body={issue.body} />
            <CommentsSection comments={comments} onCommentAdd={onCommentAdd} user={user}></CommentsSection>
        </div>
    );
}

class IssueDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issue: null,
            comments: [],
            loading: true,
            user: null,
        }
        try {
            this.issueId = this.props.location.state.issueId;
        } catch(e) {
            this.issueId = null;
        }
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onCommentAdd = this.onCommentAdd.bind(this);
    }

    async componentDidMount() {
        const issue = this.issueId && await api.reports.get(this.issueId);
        const account = api.account.isLogged();
        const id = account['publicKey'];
        const user = await api.account.get(id);
        this.setState({ user: user, issue: issue, loading: false });
    }

    onChangeStatus = e => {
        const status = this.state.issue.status;
        this.setState({
            issue: {
                ...this.state.issue,
                status: (status === 'open') ? 'closed' : 'open'
            }
        });
    }

    onCommentAdd = comment => {
        return api.comments.create({ text: comment.body, parent: this.state.issue.id });
    }

    render() {
        if (!this.issueId){
            return <Redirect to='/' noThrow/>
        }
        const { issue, comments, loading, user } = this.state;
        return (
            <IssueDetail issue={issue} user={user} comments={comments}
                onCommentAdd={this.onCommentAdd} onChangeStatus={this.onChangeStatus} loading={loading} />
        )
    }
}

export default IssueDetailPage;
