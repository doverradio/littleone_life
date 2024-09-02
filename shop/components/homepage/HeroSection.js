import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="hero-section mb-5">
      <div className="jumbotron text-center bg-primary text-white p-5">
        <h1 className="display-4">Welcome to littleone.life Shop</h1>
        <p className="lead">Explore our wide range of products, exclusive deals, and much more!</p>
        <Link href="/shop-now" className="btn btn-light btn-lg">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
