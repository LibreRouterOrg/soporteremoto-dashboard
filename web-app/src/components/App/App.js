import React from 'react';
import { Router } from '@reach/router';
import { Row, Col } from 'antd';
import LastIssuesPanel from '../LastIssuesPanel';
import NewReportWizard from '../NewReportWizard';
import CommunityMap from '../CommunityMap';
import IssuePage from '../IssuePage';
import './App.less';

function RouterComponent({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <div id="App">
      <Row id="Header">
        <Col id="HeaderLogo" span={24}> Dashboard - Soporte Remoto </Col>
      </Row>
      <Row id="Content">
        <Col span={16} id="MapContainer">
          <CommunityMap/>
        </Col>
        <Col span={8} id="MapInfoContainer">
          <Router primary={false} component={RouterComponent}>
            <LastIssuesPanel path="/" />
            <NewReportWizard path="/reports/new"/>
            <IssuePage path="/reports/:id"/>
          </Router>
        </Col>
      </Row>
    </div>
  );
}

export default App;
