import React from 'react';
import Link from 'next/link';

const DealsOfTheDay = () => {
  return (
    <section className="deals-section mb-5">
      <h2 className="mb-4">Deals of the Day</h2>
      <div className="card bg-warning text-white text-center">
        <div className="card-body">
          <h3>Special Offer on Selected Items!</h3>
          <p>Don&apos;t miss out on today&apos;s exclusive deals.</p>
          <Link href="/deals" legacyBehavior>
            <a className="btn btn-light">Shop Deals</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheDay;
