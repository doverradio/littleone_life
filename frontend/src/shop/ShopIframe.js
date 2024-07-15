// frontend/src/shop/ShopIframe.js
import React, { useEffect } from 'react';

const ShopIframe = () => {
    useEffect(() => {
        const handleMessage = (event) => {
            // Ensure the message is from the expected origin
            if (event.origin !== process.env.REACT_APP_NEXTJS_URL) return;

            const { action, data } = event.data;

            if (action === 'SELLER_STATUS') {
                // Handle the seller status data
                console.log('Seller status:', data);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (
        <iframe
            src={`${process.env.REACT_APP_NEXTJS_URL}/shop`}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default ShopIframe;
