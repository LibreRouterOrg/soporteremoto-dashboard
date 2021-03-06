import React from 'react';
import { Icon } from 'antd';
import { Avatar } from '../../utils';
import Moment from 'react-moment';
import './IssueSmallResume.less';
import 'moment/locale/es';
import {commonIssuesDict} from '../../data';

function IssueSmallResume({ issue, affectsMe, onSelect }) {
    const {commonIssueId} = issue;
    const title = commonIssueId === 'custom' ? issue.title : commonIssuesDict[commonIssueId].text;
    return (
        <div className="container" onClick={onSelect}>
            <div className="side">
                <Avatar user={issue.user} size={64} />
                <span className="username">@{issue.user.username}</span>
                <span className="node">{issue.node ? 'en ' + issue.node : ''}</span>
            </div>
            <div className="content">
                {title}
                {affectsMe &&
                    <div className="affects-me">Este problema afecta tu nodo!</div>
                }
            </div>
            <div className="bottom">
                <span className="comments">
                    <Icon type="message" /> {issue.comments.length}
                </span>
                <span className="date"><Moment locale='es' format='D MMM'>{issue.timestamp}</Moment></span>
            </div>
        </div>
    )
};

export default IssueSmallResume;
