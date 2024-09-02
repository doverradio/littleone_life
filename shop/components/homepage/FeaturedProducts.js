import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faLaptop, faClock, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const FeaturedProducts = () => {
  return (
    <section className="featured-products-section mb-5">
      <h2 className="mb-4">Featured Products</h2>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <FontAwesomeIcon icon={faMobileAlt} size="4x" className="mb-3" />
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">$29.99</p>
              <Link href="/product/product-1" className="btn btn-primary">
                View Product
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <FontAwesomeIcon icon={faLaptop} size="4x" className="mb-3" />
              <h5 className="card-title">Product 2</h5>
              <p className="card-text">$49.99</p>
              <Link href="/product/product-2" className="btn btn-primary">
                View Product
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <FontAwesomeIcon icon={faClock} size="4x" className="mb-3" />
              <h5 className="card-title">Product 3</h5>
              <p className="card-text">$19.99</p>
              <Link href="/product/product-3" className="btn btn-primary">
                View Product
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <FontAwesomeIcon icon={faShoppingCart} size="4x" className="mb-3" />
              <h5 className="card-title">Product 4</h5>
              <p className="card-text">$99.99</p>
              <Link href="/product/product-4" className="btn btn-primary">
                View Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
