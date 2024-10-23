// shop/pages/index.js

import React from 'react';
import Layout from '@/components/Partials/Layout';
import datas from '../data/products.json'; 
import Banner from '../components/Home/Banner';
import SectionStyleOne from '../components/Helpers/SectionStyleOne';
import SectionStyleTwo from '../components/Helpers/SectionStyleTwo';
import SectionStyleThree from '../components/Helpers/SectionStyleThree';
import SectionStyleFour from '../components/Helpers/SectionStyleFour';
import BrandSection from '../components/Home/BrandSection';
import CampaignCountDown from '../components/Home/CampaignCountDown';
import BestSellers from '../components/Home/BestSellers';
import ProductsAds from '../components/Home/ProductsAds';
import ViewMoreTitle from '../components/Helpers/ViewMoreTitle';

const ShopPage = () => {
  const { products } = datas;
  const brands = products.map(product => product.brand);

  return (
    <Layout>
      {/* Updated Banner Section: Add Catholic theme */}
      <Banner
        className="banner-wrapper mb-[60px]"
        imageSrc="/assets/images/catholic-banner.jpg"
        heading="Shop Sacred and Spiritual Goods"
        subheading="Find everything you need to deepen your faith"
        buttonText="Explore Products"
        buttonLink="/all-products"
      />

      {/* Featured Religious Products Section */}
      <SectionStyleOne
        products={products.filter(product => product.category === 'Religious Items')}
        brands={brands}
        categoryTitle="Spiritual Essentials"
        sectionTitle="Featured Rosaries, Medals, and More"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      />

      {/* Shop by Brand - Catholic Theme */}
      <BrandSection
        sectionTitle="Shop by Religious Brand"
        className="brand-section-wrapper mb-[60px]"
      />

      {/* Catholic Event Countdown - Modify Campaign */}
      <CampaignCountDown
        className="mb-[60px]"
        lastDate="2024-12-25 00:00:00" // Christmas Countdown
        message="Prepare for the Birth of Christ!"
      />

      {/* Top-Selling Catholic Items */}
      <ViewMoreTitle
        className="top-selling-product mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="Top Selling Catholic Items"
      >
        <SectionStyleTwo products={products.filter(product => product.category === 'Best Sellers')} />
      </ViewMoreTitle>

      {/* Best Sellers Section */}
      <ViewMoreTitle
        className="best-sellers-section mb-[60px]"
        seeMoreUrl="/sellers"
        categoryTitle="Best Sellers"
      >
        <BestSellers />
      </ViewMoreTitle>

      {/* Updated Product Ads - Catholic Themed Ads */}
      <ProductsAds
        ads={[
          `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/smart-rosary-ad.png`,
          `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/novena-ad.png`,
        ]}
        sectionHeight="sm:h-[295px] h-full"
        className="products-ads-section mb-[60px]"
      />

      {/* New Arrivals Section */}
      <SectionStyleThree
        products={products.filter(product => product.isNewArrival)}
        sectionTitle="New Arrivals in Spiritual Goods"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
      />

      {/* Final Ads Section */}
      <ProductsAds
        sectionHeight="164"
        ads={[`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/saint-statue-ad.png`]}
        className="products-ads-section mb-[60px]"
      />

      {/* Popular Sales */}
      <SectionStyleFour
        products={products.filter(product => product.isOnSale)}
        sectionTitle="Popular Catholic Sales"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      />
    </Layout>
  );
};

export default ShopPage;
