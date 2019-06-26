import { List, Row, Col, Icon, Button } from 'antd';
import React from 'react'
import issues from './LastIssues.mock-data'
import './LastIssues.css'
import Moment from 'react-moment'

const Header = () => {
    return <h2>Últimos reportes en la red</h2>
}

const Issue = ({ item }) => {
    return (
        <Row className="IssueRow">
            <Col span={2} className="IssueStatus">
                {item.status === 'open' ? (
                    <Icon type='exclamation-circle' theme='twoTone' twoToneColor='#52c41a' />
                ) : (
                        <Icon type='check-circle' theme='twoTone' twoToneColor='red' />
                    )}
            </Col>
            <Col span={22} className="IssueDescription">
                <Row>
                    <Col span={20}><h3>{item.title}</h3></Col>
                    <Col span={4}><span>#{item.id}</span></Col>
                </Row>
                <Row className="IssueReportData">
                    <Col span={24}>
                        <span>
                            Abierto el <Moment local format='L LT'>{item.date}</Moment> por {item.reporter} en nodo {item.node}
                        </span>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

function LastIssues() {
    return (
        <div id="LastIssuesContainer">
            <List id="LastIssuesList"
                header={<Header></Header>}
                itemLayout="horizontal"
                dataSource={issues}
                renderItem={item => (
                    <List.Item>
                        <Issue item={item} />
                    </List.Item>
                )}
            />
            <div id="NewReportContainer">
                <Button type="primary"> Nuevo Reporte </Button>
            </div>
        </div>
    )
}

export default LastIssues