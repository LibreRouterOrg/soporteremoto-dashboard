import React from 'react';
import { Link, navigate } from '@reach/router';
import './LastIssuesPanel.less';
import IssueSmallResume from './IssueSmallResume';
import { Tabs, Icon, List, Button } from 'antd';
import api from '../../api';

const { TabPane } = Tabs;


/* These two styles modify antd components to be flex containers
and allow issues list to be scrollable. Newer versions of antd may break this UI */
const tabsStyle = {
    flex: "auto",
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
                    <IssueSmallResume issue={issue} onSelect={() => navigate('/report/' + encodeURI(issue.id))} />
                </List.Item>
            )
        } />
    )
}

function NewIssue() {
    return (
        <div className="new-issue">
            <Link to='/reports/new'>
                <Button type="link" icon="notification" size='large'>
                    Nuevo Reporte
                </Button>
            </Link>
        </div>
    )
}

export function LastIssuesPanel({ issues }) {
    const open_issues = issues.filter(x => (x.status === 'open'))
    const closed_issues = issues.filter(x => (x.status === 'closed'))
    return (
        <div className="last-issues-panel">
            <IssuesTabs open_issues={open_issues} closed_issues={closed_issues}></IssuesTabs>
            <NewIssue></NewIssue>
        </div>
    )
}

class LastIssuesPanelPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: []
        }
    }

    componentDidMount() {
        // Hack: This timeout is a workaround, see this issue:
        // https://github.com/LibreRouterOrg/soporteremoto-dashboard/issues/18
        setTimeout(async () => {
            const reports = await api.reports.list();
            this.setState({ reports: reports });
        }, 500);
    }

    render() {
        return <LastIssuesPanel issues={this.state.reports} />;
    }
}

export default LastIssuesPanelPage;
