import React from 'react';
import './LastIssuesPanel.css';
import IssueSmallResume from './IssueSmallResume';
import { Tabs, Icon, List, Button } from 'antd';

const { TabPane } = Tabs;


/* These two styles modify antd components to be flex containers
and allow issues list to be scrollable. Newer versions of antd may break this UI */
const tabsStyle = {
    display: "flex",
    flexDirection: "column",
};

const tabsPanStyle = {
    overflow: "auto",
    display: "flex",
};

const tabBarStyle = {
    margin: "0",
}

const openIssuesTab = qty => <><Icon type='exclamation-circle' /> {qty} Abiertos </>
const closedIssuesTab = qty => <><Icon type='check-circle' /> {qty} Resueltos </>

function IssuesTabs({ open_issues, closed_issues }) {
    return (
        <Tabs style={tabsStyle} tabBarStyle={tabBarStyle} defaultActiveKey="1">
            <TabPane style={tabsPanStyle} tab={openIssuesTab(open_issues.length)} key="1">
                <IssuesList issues={open_issues} />
            </TabPane>
            <TabPane tab={closedIssuesTab(closed_issues.length)} key="2">
                <IssuesList issues={closed_issues} />
            </TabPane>
        </Tabs>
    )
}

function IssuesList({ issues }) {
    const itemStyle = {
        display: "flex"
    }
    const sortedIssues = issues.sort((x, y) => y.timestamp - x.timestamp)
    return (
        <List size="small" className="issues-list" dataSource={sortedIssues} renderItem={
            issue => (
                <List.Item style={itemStyle}>
                    <IssueSmallResume issue={issue} />
                </List.Item>
            )
        } />
    )
}

function NewIssue() {
    return (
        <div className="new-issue">
            <Button type="primary" shape="round" icon="notification" size='large'>
                Nuevo Reporte
            </Button>
        </div>
    )
}

function LastIssuesPanel({ issues }) {
    const open_issues = issues.filter(x => (x.status === 'open'))
    const closed_issues = issues.filter(x => (x.status === 'closed'))
    return (
        <div className="last-issues-panel">
            <IssuesTabs open_issues={open_issues} closed_issues={closed_issues}></IssuesTabs>
            <NewIssue></NewIssue>
        </div>
    )
}

export default LastIssuesPanel;