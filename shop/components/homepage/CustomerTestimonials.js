import React from 'react';

const CustomerTestimonials = () => {
  return (
    <section className="testimonials-section mb-5">
      <h2 className="mb-4">What Our Customers Say</h2>
      <div className="row">
        <div className="col-md-4">
          <blockquote className="blockquote">
            <p className="mb-2">"Great shopping experience! Highly recommended!"</p>
            <footer className="blockquote-footer" style={{ marginTop: '10px' }}>John Doe</footer>
          </blockquote>
        </div>
        <div className="col-md-4">
          <blockquote className="blockquote">
            <p className="mb-2">"Fast shipping and excellent customer service."</p>
            <footer className="blockquote-footer" style={{ marginTop: '10px' }}>Jane Smith</footer>
          </blockquote>
        </div>
        <div className="col-md-4">
          <blockquote className="blockquote">
            <p className="mb-2">"Quality products at great prices. I'll be back!"</p>
            <footer className="blockquote-footer" style={{ marginTop: '10px' }}>Mary Johnson</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
