import React from 'react';
import { useState } from 'react';
// import { useState, useEffect } from 'react';
// import { fetchProduct } from './api';
import NavbarMain from './NavbarMain';
import MainPageBody from './MainPageBody';
import Footer from './Footer';

const MainPage = () => {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchProduct();
  //     setProducts(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <NavbarMain />
      <MainPageBody />
      <Footer />
    </>
  );
}

export default MainPage