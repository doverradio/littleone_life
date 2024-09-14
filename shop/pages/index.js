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
      <Banner className="banner-wrapper mb-[60px]" />
      
      <SectionStyleOne
        products={products}
        brands={brands}
        categoryTitle="Mobile & Tablet"
        sectionTitle="Gamer World"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      />

      <BrandSection
        sectionTitle="Shop by Brand"
        className="brand-section-wrapper mb-[60px]"
      />

      <CampaignCountDown
        className="mb-[60px]"
        lastDate="2025-10-04 4:00:00"
      />

      <ViewMoreTitle
        className="top-selling-product mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="Top Selling Products"
      >
        <SectionStyleTwo products={products.slice(3)} />
      </ViewMoreTitle>

      <ViewMoreTitle
        className="best-sellers-section mb-[60px]"
        seeMoreUrl="/sellers"
        categoryTitle="Best Seller"
      >
        <BestSellers />
      </ViewMoreTitle>

      {/* Updated with NEXT_PUBLIC_BASE_URL and leading slashes */}
      <ProductsAds
        ads={[
          `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/banner-1.png`,
          `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/banner-2.png`,
        ]}
        sectionHeight="sm:h-[295px] h-full"
        className="products-ads-section mb-[60px]"
      />

      <SectionStyleThree
        products={products}
        sectionTitle="New Arrivals"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
      />

      <ProductsAds
        sectionHeight="164"
        ads={[`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/banner-4.png`]}
        className="products-ads-section mb-[60px]"
      />

      <SectionStyleFour
        products={products}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      />
    </Layout>
  );
};

export default ShopPage;
