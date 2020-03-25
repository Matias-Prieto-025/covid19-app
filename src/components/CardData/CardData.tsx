import React from 'react';
import './card.css';

interface CardDataProps { 
    title: string, 
    value: number,
    classProp?: string,
    rate?: string
};

const CardData: React.FC<CardDataProps> = ({ value, title, classProp = null, rate = null }) => (
    <div className={`card-data ${classProp ? classProp : ''}`}>
        <span className="card-data-title">{title}</span>
        <span className="card-data-value">{value}</span>
        {rate && <span>{`${rate} %`}</span>}
    </div>
);

export default CardData;