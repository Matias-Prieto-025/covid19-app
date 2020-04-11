import React from 'react';
import { Row, Col } from 'antd';
import './card.css';

interface CardDataProps { 
    title: string, 
    value: number,
    className?: string,
    rate?: string
};

const CardData: React.FC<CardDataProps> = ({ value, title, className = null, rate = null }) => (
    <div className={`card ${className ? className : ''}`}>
        <Row>
            <Col span={24}>
                <span className="card-value">{value.toLocaleString()}</span>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <span>{title}</span>
                {rate && <span className={"card-rate-value"}>&nbsp;{rate}%</span>}
            </Col>
        </Row>
    </div>
);

export default CardData;