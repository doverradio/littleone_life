import React from "react";

const Footer = () =>
{
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{backgroundColor: "#f8f9fa", padding: "20px 0"}}>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column", width: "80%", margin: "0 auto"}}>

                {/* Social Media Icons */}
                <div>
                    <a href="your_facebook_link" target="_blank" rel="noopener noreferrer">Facebook</a> |
                    <a href="your_twitter_link" target="_blank" rel="noopener noreferrer">Twitter</a> |
                    <a href="your_instagram_link" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>

                {/* Quick Links */}
                <div>
                    <a href="/about">About Us</a> |
                    <a href="/terms">Terms of Service</a> |
                    <a href="/privacy">Privacy Policy</a>
                </div>

                {/* Copyright */}
                <div>
                    © {currentYear} bigdeal.sale. All Rights Reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer;