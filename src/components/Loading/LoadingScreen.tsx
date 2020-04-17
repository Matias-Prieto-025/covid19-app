import React from 'react';
import { Row, Col } from 'antd';
import { LoadingOutlined} from '@ant-design/icons';
import './loadingScreen.css';

const LoadingScreen = () => (
    <div className="loadingScreen">
        <Row gutter={[0,24]}>
            <Col span={24}>
                <LoadingOutlined  style={{ fontSize: 48}}/>
            </Col>
        </Row>
        <Row gutter={[0,24]}>
            <Col span={24}>
                <p>Loading...</p>
            </Col>
        </Row>
    </div>
)

export default LoadingScreen;