import React from 'react';
import { Layout } from 'antd';
import { Row, Col } from 'antd';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="fullLayout">
      <Header>
        Soporte Remoto
      </Header>
      <Layout>
        <Content>
          <Row>
            <Col span={16} id="MapContainer"> Map should be here</Col>
            <Col span={8} id="MapInfoContainer"> Info should be here</Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
