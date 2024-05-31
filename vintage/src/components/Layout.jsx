// eslint-disable-next-line no-unused-vars
import React from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
