import React from 'react';
import { Layout } from 'antd';
import './footer.css';

const Footer: React.FC = () => (
    <Layout.Footer className="footer">
        <span>Dev: Matias Prieto</span>
        <span>Data: <a target="_blank" rel="noopener noreferrer" href="https://github.com/novelcovid/api">NovelCOVID</a></span>
    </Layout.Footer>
);

export default Footer;