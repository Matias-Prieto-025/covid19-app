import React from 'react';
import './card.css';

interface CardDataProps { 
    value: number,
    title: string, 
    classProp?: string 
};

const CardData: React.FC<CardDataProps> = ({ value, title, classProp = null }) => (
    <div className={`card-data ${classProp ? classProp : ''}`}>
        <span className="card-data-title">{title}</span>
        <span className="card-data-value">{value}</span>
    </div>
);

export default CardData;