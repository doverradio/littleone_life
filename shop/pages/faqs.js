// shop/pages/faqs.js
import React from 'react';
import Layout from '@/components/Partials/Layout'; // Import the layout component

const FAQs = () => {
    return (
        <Layout>
            <div className="container mt-5">
                <h1>Frequently Asked Questions</h1>
                <div className="accordion" id="faqsAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                What is your return policy?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqsAccordion">
                            <div className="accordion-body">
                                You can return any item within 30 days of purchase for a full refund.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                How can I track my order?
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqsAccordion">
                            <div className="accordion-body">
                                You can track your order using the tracking number provided in the confirmation email.
                            </div>
                        </div>
                    </div>
                    {/* Add more FAQs as needed */}
                </div>
            </div>
        </Layout>
    );
};

export default FAQs;
