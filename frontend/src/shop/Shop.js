// frontend/src/shop/Shop.js
import React from 'react';

const Shop = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="http://localhost:3002" // Update to the new subdomain when ready 
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Shop"
      ></iframe>
    </div>
  );
};

export default Shop;
