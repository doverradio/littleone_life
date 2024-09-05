// /shop/components/CartIcon.js

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const CartIcon = ({ cartItemCount }) => {
  return (
    <Link href="/cart" className="cart-icon position-relative">
      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      {cartItemCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartItemCount}
          <span className="visually-hidden">items in cart</span>
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
