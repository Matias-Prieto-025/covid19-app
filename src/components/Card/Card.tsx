import React from 'react';
import './card.css';

interface CardDataProps { 
    title: string, 
    value: number,
    className?: string,
    rate?: string
};

const CardData: React.FC<CardDataProps> = ({ value, title, className = null, rate = null }) => (
    <div className={`card ${className ? className : ''}`}>
        <span className="card-value">{value.toLocaleString()}</span>
        <div className="flex card-title">
            <span>{title}</span>
            {rate && <span className={"card-rate-value"}>&nbsp;{rate}%</span>}
        </div>
    </div>
);

export default CardData;