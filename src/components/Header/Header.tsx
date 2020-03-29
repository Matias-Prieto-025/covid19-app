import React from 'react';
import './header.css';

const Header: React.FC = () => {

    return (
        <header className="flex page-header">
            <div className="brand">
                <img height="30" width="30" src="./logo.png" alt="logo"/>
                <h3>Covid-19</h3>
            </div>
        </header>
    );
}

export default Header;