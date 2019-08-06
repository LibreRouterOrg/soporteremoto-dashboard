import React from 'react';
import { Row, Col } from 'antd';
import './App.css';

function App() {
  return (
    <div id="App">
      <Row id="Header">
        <Col id="HeaderLogo" span={24}> Dashboard - Soporte Remoto </Col>
      </Row>
      <Row id="Content">
        <Col span={16} id="MapContainer"></Col>
        <Col span={8} id="MapInfoContainer"></Col>
      </Row>
    </div>
  );
}

export default App;
