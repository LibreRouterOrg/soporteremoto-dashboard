import React, { Component } from 'react';
import Comments from '../Comments';
import { commonIssuesDict } from '../data/commonIssues';
import { Icon } from 'antd';
import { Menu } from './Menu';
import './IssuePage.less';
import moment from 'moment';

function Header({ issue, onChangeStatus }) {
    return (
        <div className="header">
            <div className="header-title">
                <div className="title">Reporte #{issue.id}
                {issue.status === "open" ?
                    <div className="status">
                        <Icon className="status-icon status-open" type="exclamation-circle"/>
                        Abierto
                    </div>
                    :
                    <div className="status">
                        <Icon className="status-icon status-closed" type="check-circle" />
                        Resuelto
                    </div>
                }
                </div>
                <div className="subtitle">Por {issue.user.username} el {moment(issue.timestamp).format('LLL')}</div>
            </div>
            <div className="menu">
                <Menu status={issue.status} onChange={onChangeStatus} />
            </div>
        </div>
    );
}

class IssuePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: this.props.issue.comments,
        }
    }

    getCommonIssueText(commonIssue) {
        let result = "";
        if (commonIssue == null) {
            return "Ninguno de los problemas conocidos";
        }
        if (commonIssue.parent) {
            result += commonIssuesDict[commonIssue.parent].text;
            result += " > ";
        }
        result += commonIssue.text;
        return result;
    }

    render() {
        const { issue, user } = this.props;
        return (
            <div className="issue-page">
                <div className="section">
                    <Header issue={issue} />
                </div>
                <div className="section">
                    <div className="title">Tipo de problema</div>
                    <div className="section-content">
                        <div className="common-issue-text">
                            {this.getCommonIssueText(issue.common_issue)}
                        </div>
                    </div>
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