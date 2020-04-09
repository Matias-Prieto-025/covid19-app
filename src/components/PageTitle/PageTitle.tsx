import React from 'react';
import './pageTitle.css';

interface PageTitleProps {
    title: string
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
    return(
        <section className="page-title">
            <h2>{title}</h2>
        </section>
    )
}

export default PageTitle;