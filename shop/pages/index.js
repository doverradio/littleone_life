// shop/pages/index.js
import React from 'react';
import Layout from './layout';
import HeroSection from '../components/homepage/HeroSection';
import CategoryHighlights from '../components/homepage/CategoryHighlights';
import FeaturedProducts from '../components/homepage/FeaturedProducts';
import DealsOfTheDay from '../components/homepage/DealsOfTheDay';
import CustomerTestimonials from '../components/homepage/CustomerTestimonials';

const ShopPage = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <HeroSection />
        <CategoryHighlights />
        <FeaturedProducts />
        <DealsOfTheDay />
        <CustomerTestimonials />
      </div>
    </Layout>
  );
};

export default ShopPage;
