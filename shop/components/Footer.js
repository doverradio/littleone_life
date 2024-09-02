import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/faqs">FAQs</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="d-flex">
              <Link href="https://www.facebook.com">
                <FontAwesomeIcon icon={faFacebook} size="lg" className="me-3" />
              </Link>
              <Link href="https://www.twitter.com">
                <FontAwesomeIcon icon={faTwitter} size="lg" className="me-3" />
              </Link>
              <Link href="https://www.instagram.com">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <h5>Newsletter</h5>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Your email address" />
              </div>
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="text-muted">© {currentYear} littleone.life. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
