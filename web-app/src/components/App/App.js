import React from 'react';
import { Row, Col } from 'antd';
import './App.css';
import CommunityMap from '../CommunityMap/CommunityMap';

function App() {
  return (
    <div id="App">
      <Row id="Header">
        <Col id="HeaderLogo" span={24}> Dashboard - Soporte Remoto </Col>
      </Row>
      <Row id="Content">
        <Col span={16} id="MapContainer"><CommunityMap></CommunityMap></Col>
        <Col span={8} id="MapInfoContainer"> Last issues should be shown here</Col>
      </Row>
    </div>
  );
}

export default App;
