import React from 'react';
import { Avatar, Icon, Tooltip } from 'antd';
import Moment from 'react-moment';
import './IssueSmallResume.css';
import 'moment/locale/es';

function IssueSmallResume({ issue, affectsMe, onSelect }) {
    const title = issue.common_issue ? issue.common_issue.text : issue.body;
    return (
        <div className="IssueContainer" onClick={onSelect}>
            <div className="IssueSide">
                {issue.user.is_bot ?
                    <Avatar icon='robot' size={64} />
                : (issue.user.avatar ?
                    <Avatar src={issue.user.avatar} size={64} />
                    :
                    <Avatar size={64}>{issue.user.username[0].toUpperCase()}</Avatar>
                )}
                <span className="IssueReporterNickname">@{issue.user.username}</span>
            </div>
            <div className="IssueTitle">
                {issue.status == "open" ?
                    <Tooltip title="Reporte Abierto" placement="right">
                        <Icon className="statusIcon statusOpen" type="exclamation-circle"/>
                    </Tooltip>
                :
                    <Tooltip title="Reporte Cerrado" placement="right">
                        <Icon className="statusIcon statusClosed" type="check-circle"/>
                    </Tooltip>
                }
                {title}
            </div>
            <div className="IssueExtraMessages">
                {affectsMe &&
                    <span>Este problema afecta tu nodo!</span>
                }
            </div>
            <div className="IssueLastRow">
                <span className="Comments">
                    <Icon type="message" /> {issue.comments.length}
                </span>
                <span className="IssueDate"><Moment locale='es' format='D MMM'>{issue.timestamp}</Moment></span>
            </div>
        </div>
    )
};

export default IssueSmallResume;