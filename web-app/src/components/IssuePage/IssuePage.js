import React, { Component } from 'react';
import { Redirect } from '@reach/router';
import moment from 'moment';
import Comments from '../Comments';
import { Button, Tag } from 'antd';
import Menu from './Menu';
import Status from './Status';
import { commonIssuesDict } from '../data/commonIssues';
import './IssuePage.less';
import api from '../../api';


const Header = ({ issue, onChangeStatus }) => {
    return (
        <div className="header">
            <div className="header-info">
                <div className="header-title">
                    <div className="header-back-button">
                        <Button type="link" icon="arrow-left" />
                    </div>
                    Reporte <Tag>{issue.id.slice(1, 8)}</Tag>
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
}



const SubjectSection = ({ commonIssueId, title }) => {
    let subject = "";
    if (title) {
        subject = title;
    } else {
        const commonIssue = commonIssuesDict[commonIssueId];
        const parentText = (commonIssue && commonIssue.parent) ?
            commonIssuesDict[commonIssue.parent].text + ' > ' : '';
        const childText = commonIssue ? commonIssue.text : 'Ninguno de los problemas conocidos';
        subject = parentText + childText;
    }
    return (
        <div className="section">
            <div className="section-title">Asunto</div>
            <div className="section-content">
                <div className="common-issue-text">
                    {subject}
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

const CommentsSection = ({ commentsIds, user, onCommentAdd }) => (
    <div className="section">
        <Comments commentsIds={commentsIds} onCommentAdd={onCommentAdd} user={user} />
    </div>
);

export const IssueDetail = ({ issue, user, commentsIds, onCommentAdd, onChangeStatus, loading }) => {
    if (loading) {
        return 'Cargando...'
    }
    return (
        <div className="issue-page">
            <Header issue={issue} onChangeStatus={onChangeStatus} />
            <SubjectSection commonIssueId={issue.commonIssueId} title={issue.title} />
            <BodySection body={issue.body} />
            <CommentsSection commentsIds={commentsIds} onCommentAdd={onCommentAdd} user={user}></CommentsSection>
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
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onCommentAdd = this.onCommentAdd.bind(this);
    }

    async componentDidMount() {
        const issue = this.props.issueId && await api.reports.get(this.props.issueId);
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
        return api.comment.create({ text: comment.body, parent: this.state.issue.id })
            .then((comment) => this.setState({ commentIds: this.state.commentsIds.concat([comment.id]) }))
    }

    render() {
        if (!this.props.issueId) {
            return <Redirect to='/' noThrow />
        }
        const { issue, commentsIds, loading, user } = this.state;
        return (
            <IssueDetail issue={issue} user={user} commentsIds={commentsIds}
                onCommentAdd={this.onCommentAdd} onChangeStatus={this.onChangeStatus} loading={loading} />
        )
    }
}

export default IssueDetailPage;
