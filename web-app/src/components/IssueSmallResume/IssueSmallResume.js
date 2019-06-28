import React from 'react';
import { Avatar, Badge } from 'antd';
import Moment from 'react-moment';
import './IssueSmallResume.css';
import 'moment/locale/es';

function IssueSmallResume({ issue, onSelect }) {
    return (
        <div className="IssueContainer">
            <div className="IssueSide">
                <Avatar icon={"user"} size={64}/>
            </div>
            <div className="IssueContent">
                <div className="IssueTitle"><h2>{issue.title}</h2></div>
                <div className="IssueReportData">
                    <span> Abierto el <Moment locale='es' format='LLLL'>{issue.date}</Moment> por {issue.reporter} en nodo {issue.node}</span>
                </div>
                <div className="IssueStats">
                    <span>Siguiendo Afectados({issue.affected_nodes.length})</span>
                </div>
            </div>
        </div>
    )
};

export default IssueSmallResume;