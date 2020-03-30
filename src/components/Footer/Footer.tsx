import React from 'react';
import './footer.css';

const Footer: React.FC = () => (
    <footer className="footer">
        <span>Developer: Matias Prieto</span>
        <span>Data: <a target="_blank" rel="noopener noreferrer" href="https://github.com/mathdroid/covid-19-api">Mathdroid</a></span>
    </footer>
);

export default Footer;