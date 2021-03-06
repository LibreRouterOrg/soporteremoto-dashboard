import React from 'react';
import { Router, Redirect } from '@reach/router';
import { Row, Col } from 'antd';
import Login from '../Login';
import Registration from '../Account/Registration';
import AccountEdition from '../Account/Edition';
import Congrats from '../Account/Congrats';
import LastIssuesPanel from '../LastIssuesPanel';
import NewReportWizard from '../NewReportWizard';
import CommunityMap from '../CommunityMap';
import IssuePage from '../IssuePage';
import './App.less';
import api from '../../api';
import NavBar from '../NavBar';
import { NetworkContextProvider } from '../utils';

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


function Layout() {
  return (
    <div id="App">
      <div id="Header">
          <NavBar></NavBar>
      </div>
      <Row id="Content">
        <Col md={16} id="MapContainer">
          <CommunityMap />
        </Col>
        <Col md={8} span={24} id="MapInfoContainer">
          {/* primary and component props are set to avoid breaking style.
              Follow https://github.com/reach/router/issues/63 for more info */}
          <Router primary={false} component={PrivateRoute}>
            <LastIssuesPanel path="/" />
            <NewReportWizard path="/reports/new" />
            <IssuePage path="/report/:issueId" />
            <Congrats path="/congrats" />
            <AccountEdition path="/account_edition"/>
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

function App() {
  return (
    <NetworkContextProvider>
      <Layout />
    </NetworkContextProvider>
  )
}
export default App;
