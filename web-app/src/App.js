import React from 'react';
import { Layout } from 'antd';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className="fullLayout">
      <Header>
        Soporte Remoto
      </Header>
      <Layout>
        <Content></Content>
      </Layout>
    </Layout>
  );
}

export default App;
