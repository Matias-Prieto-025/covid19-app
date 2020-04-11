import React from 'react';
import { Layout as AntLayout } from 'antd';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import './layout.css';
const { Content } = AntLayout

const Layout: React.FC = ({ children }) => {
  return(
    <AntLayout className="layout">
      <div>
        <Navbar />
      </div>
      <Content>
        <section className="main-content">
          { children }
        </section>
        <Footer />
      </Content>
    </AntLayout>
  );
}

export default Layout;