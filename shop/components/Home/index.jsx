import React from 'react';
import Layout from '../Partials/Layout';
import datas from '../data/products.json'; 
import Banner from '../Home/Banner';
import SectionStyleOne from '../Helpers/SectionStyleOne';
import SectionStyleTwo from '../Helpers/SectionStyleTwo';
import SectionStyleThree from '../Helpers/SectionStyleThree';
import SectionStyleFour from '../Helpers/SectionStyleFour';
import BrandSection from '../Home/BrandSection';
import CampaignCountDown from '../Home/CampaignCountDown';
import BestSellers from '../Home/BestSellers';
import ProductsAds from '../Home/ProductsAds';
import ViewMoreTitle from '../Helpers/ViewMoreTitle';

export default function Home() {
  const { products } = datas;
  const brands = [];
  products.forEach((product) => {
    brands.push(product.brand);
  });

  return (
    <>
      <Layout>
        <div className="btn w-5 h-5 "></div>
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
          <SectionStyleTwo products={products.slice(3, products.length)} />
        </ViewMoreTitle>
        <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Best Saller"
        >
          <BestSellers />
        </ViewMoreTitle>
        <ProductsAds
          ads={[
            `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/bannera-1.png`,
            `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/bannera-2.png`,
          ]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleOne
          categoryBackground={`${
            process.env.NEXT_PUBLIC_BASE_URL
          }/assets/images/section-category-2.jpg`}
          products={products.slice(4, products.length)}
          brands={brands}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
        <ProductsAds
          ads={[`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/bannera-3.png`]}
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
          ads={[`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/bannera-4.png`]}
          className="products-ads-section mb-[60px]"
        />
        <SectionStyleFour
          products={products}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
        />
      </Layout>
    </>
  );
}
