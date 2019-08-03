import React from 'react';
import { Icon, Tooltip } from 'antd';
import { Avatar } from '../utils';
import Moment from 'react-moment';
import './IssueSmallResume.css';
import 'moment/locale/es';

function IssueSmallResume({ issue, affectsMe, onSelect }) {
    const title = issue.common_issue ? issue.common_issue.text : issue.body;
    return (
        <div className="IssueContainer" onClick={onSelect}>
            <div className="IssueSide">
                <Avatar user={issue.user} size={64}/>
                <span className="IssueReporterNickname">@{issue.user.username}</span>
            </div>
            <div className="IssueTitle">
                {issue.status === "open" ?
                    <Tooltip title="Reporte Abierto" placement="right">
                        <Icon className="statusIcon statusOpen" type="exclamation-circle" />
                    </Tooltip>
                    :
                    <Tooltip title="Reporte Cerrado" placement="right">
                        <Icon className="statusIcon statusClosed" type="check-circle" />
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