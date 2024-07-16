// shop/pages/shop/index.js
import { useEffect } from 'react';

const ShopPage = () => {
    useEffect(() => {
        // Function to send messages to the parent window
        const sendMessage = (action, data) => {
            window.parent.postMessage({ action, data }, process.env.NEXT_PUBLIC_REACT_URL);
        };

        // Example: Sending seller status
        const sellerStatus = { isSeller: true, subscriptionLevel: 'premium' };
        sendMessage('SELLER_STATUS', sellerStatus);
    }, []);

    return (
        <div>
            <h1>Shop by Next.js</h1>
            {/* Your shop functionality */}
        </div>
    );
};

export default ShopPage;
