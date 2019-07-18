import React from 'react';
import { Avatar, Icon } from 'antd';
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
            <div className="IssueTitle"><h3>{issue.title}</h3></div>
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