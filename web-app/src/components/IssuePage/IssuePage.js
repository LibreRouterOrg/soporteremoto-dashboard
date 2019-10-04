import React, { Component } from 'react'
import moment from 'moment';
import Comments from '../Comments';
import { Button } from 'antd';
import Menu from './Menu';
import Status from './Status';
import { commonIssuesDict } from '../data/commonIssues';
import './IssuePage.less';
import api from '../../api';
import { navigate } from '@reach/router';

const STATUS_OPEN = 'open'
const STATUS_RESOLVED = 'resolved'

const IssueContext = React.createContext({ issue: null, changeStatus: () => null })

class IssueContextProvider extends Component {
    constructor(props) {
        super(props);
        this.changeStatus = this.changeStatus.bind(this);
        this.updateStatus = this.updateStatus.bind(this);

        this.state = {
            issue: null,
            issueStatus: null,
            changeStatus: this.changeStatus,
            loading: true,
        }
    }

    async componentDidMount() {
        const issue = await api.reports.get(this.props.issueId);
        issue.user = await api.account.get(issue.user);
        this.setState({ issue: issue, loading: false, issueStatus: issue.status});
    }

    updateStatus(status) {
        this.setState({issueStatus: status});
    }

    changeStatus() {
        const newStatus = this.state.issueStatus === STATUS_OPEN ? STATUS_RESOLVED : STATUS_OPEN;
        api.reports.setStatus(this.props.issueId, newStatus)
            .then(this.updateStatus(newStatus));
    }

    render() {
        return (
            <IssueContext.Provider value={this.state}>
                {!this.state.loading && this.props.children}
            </IssueContext.Provider>
        )
    }
}

const NavBar = () => (
    <div className="nav-bar">
        <Button type="link" icon="arrow-left" onClick={() => navigate('/')} />
        <div className="nav-bar-menu">
            <IssueContext.Consumer>
                {({ issueStatus, changeStatus }) =>
                    <Menu status={issueStatus} onChange={changeStatus} />
                }
            </IssueContext.Consumer>
        </div>
    </div>
)

const Subject = ({ issue }) => {
    const { commonIssueId, title } = issue;
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
    return subject
}

const IssueDetail = () => (
    <IssueContext.Consumer>
        {({ issue, issueStatus }) =>
            <div className="issue-detail">
                <div className="header">
                    <div className="header-title">
                        {"Reporte " + issue.id.slice(1, 8)}
                        <div className="header-status"><Status status={issueStatus} /></div>
                    </div>
                    <div className="header-subtitle">
                        Por {issue.user.username ? issue.user.username : '?'}
                        {issue.node ? ' en ' + issue.node : ''}
                        {' el ' + moment(issue.timestamp).format('LLL')}
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Asunto</div>
                    <div className="section-content">
                        <div className="common-issue-text">
                            <Subject issue={issue}></Subject>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="section-title">Detalles</div>
                    <div className="section-content">{issue.body}</div>
                </div>
            </div>
        }
    </IssueContext.Consumer>
)

function IssuePage({ issueId }) {
    return (
        <IssueContextProvider issueId={issueId}>
            <div className="issue-page">
                <NavBar />
                <IssueDetail />
                <Comments issueId={issueId} />
            </div>
        </IssueContextProvider>
    )
}

export default IssuePage
