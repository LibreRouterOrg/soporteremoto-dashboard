import React from 'react';
import { Router, Redirect } from '@reach/router';
import { Row, Col } from 'antd';
import Login from '../Login';
import Registration from '../Registration';
import Congrats from '../Registration/Congrats';
import LastIssuesPanel from '../LastIssuesPanel';
import NewReportWizard from '../NewReportWizard';
import CommunityMap from '../CommunityMap';
import IssuePage from '../IssuePage';
import './App.less';
import api from '../../api';

function PrivateRoute({ children }) {
  /* Renders children component only if user is logged,
    otherwise redirects to registration*/
  if (api.account.isLogged()) {
    return <>{children}</>;
  } else {
    const pathname = children.props.location.pathname;
    return (
      <Redirect to="/registration" state={{ from: pathname }} noThrow />
    );
  }
}

function NotLoggedRoute({ children }) {
  if (api.account.isLogged()) {
    return (
      <Redirect to="/" noThrow />
    );
  } else {
    return <>{children}</>;
  }
}


function App() {
  return (
    <div id="App">
      <Row id="Header">
        <Col id="HeaderLogo" span={24}> Dashboard - Soporte Remoto </Col>
      </Row>
      <Row id="Content">
        <Col span={16} id="MapContainer">
          <CommunityMap />
        </Col>
        <Col span={8} id="MapInfoContainer">
          {/* primary and component props are set to avoid breaking style.
              Follow https://github.com/reach/router/issues/63 for more info */}
          <Router primary={false} component={PrivateRoute}>
            <LastIssuesPanel path="/" />
            <NewReportWizard path="/reports/new" />
            <IssuePage path="/report" />
            <Congrats path="/congrats" />
          </Router>
          <Router primary={false} component={NotLoggedRoute}>
            <Registration path="/registration" />
            <Login path="/login" />
          </Router>
        </Col>
      </Row>
    </div>
  );
}

export default App;
