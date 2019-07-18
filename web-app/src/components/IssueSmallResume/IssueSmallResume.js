import React from 'react';
import { Avatar, Icon, Tooltip } from 'antd';
import Moment from 'react-moment';
import './IssueSmallResume.css';
import 'moment/locale/es';

function IssueSmallResume({ issue, onSelect }) {
    return (
        <div className="IssueContainer">
            <div className="IssueSide">
                {issue.is_bot ?
                    <Avatar icon='robot' size={64} />
                : (issue.avatarSrc ?
                    <Avatar src={issue.avatarSrc} size={64} />
                    :
                    <Avatar size={64}>{issue.reporter[0].toUpperCase()}</Avatar>
                )}
                <span className="IssueReporterNickname">@{issue.reporter}</span>
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
                {issue.title}
            </div>
            <div className="IssueExtraMessages">
                {issue.affect_current_user &&
                    <span>Este problema afecta tu nodo!</span>
                }
            </div>
            <div className="IssueLastRow">
                <span className="Comments">
                    <Icon type="message" /> {issue.comments.length}
                </span>
                <span className="IssueDate"><Moment locale='es' format='D MMM'>{issue.date}</Moment></span>
            </div>
        </div>
    )
};

export default IssueSmallResume;