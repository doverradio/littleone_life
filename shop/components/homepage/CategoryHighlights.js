import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faTshirt, faCouch } from '@fortawesome/free-solid-svg-icons';

const CategoryHighlights = () => {
  return (
    <section className="categories-section mb-5">
      <h2 className="mb-4">Shop by Category</h2>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <FontAwesomeIcon icon={faLaptop} size="4x" className="mb-3" />
              <h5 className="card-title">Electronics</h5>
              <Link href="/category/electronics" className="btn btn-primary">
                Browse Electronics
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <FontAwesomeIcon icon={faTshirt} size="4x" className="mb-3" />
              <h5 className="card-title">Fashion</h5>
              <Link href="/category/fashion" className="btn btn-primary">
                Browse Fashion
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <FontAwesomeIcon icon={faCouch} size="4x" className="mb-3" />
              <h5 className="card-title">Home & Kitchen</h5>
              <Link href="/category/home-kitchen" className="btn btn-primary">
                Browse Home & Kitchen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
