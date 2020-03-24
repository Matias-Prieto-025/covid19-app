import React from 'react';
import { SummaryResponseItem } from '../../types';

type CardDataProps = SummaryResponseItem & { title: string, classProp?: string };

const handleMoreValuesClick = (url: string): void => {
    console.log(url)
}

const CardData: React.FC<CardDataProps> = ({ detail, value, title, classProp = null }) => (
    <div className={`card-data ${classProp ? classProp : ''}`}>
        <span className="card-data-title">{title}</span>
        <p>{value}</p>
        <span onClick={(event) => handleMoreValuesClick(detail) }> More values</span>
    </div>
);

export default CardData;