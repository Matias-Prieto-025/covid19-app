import React from 'react';
import { NavLink } from 'react-router-dom';
import { DoubleRightOutlined, GlobalOutlined, LineChartOutlined, OrderedListOutlined } from '@ant-design/icons';
import './navbar.css';

const Navbar = () => {

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <div className="nav-link">
            <span className="nav-link-text">Covid-19</span>
            <DoubleRightOutlined />
          </div>
        </li>
        <li className="navbar-item">
          <NavLink exact to="/" activeClassName="nav-link-active" className="nav-link">
          <GlobalOutlined />
          <span className="nav-link-text">Home</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink exact to="/historical" activeClassName="nav-link-active" className="nav-link">
          <LineChartOutlined />
            <span className="nav-link-text">Historical</span>
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink exact to="/compare" activeClassName="nav-link-active" className="nav-link">
          <OrderedListOutlined />
            <span className="nav-link-text">Compare</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;