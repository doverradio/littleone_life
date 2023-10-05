import React from "react";
import { SiFacebook } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { PiTiktokLogoBold } from "react-icons/pi";
import { BsYoutube } from "react-icons/bs";

const Footer = () =>
{
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{backgroundColor: "black", padding: "20px 0"}}>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column", width: "80%", margin: "0 auto"}}>

                {/* Social Media Icons */}
                <div style={{ color: "white" }}>
                    <a title="youtube" href="https://www.youtube.com/@littleone9939" target="_blank" rel="noopener noreferrer"><BsYoutube /></a> |&nbsp;
                    <a title="facebook" href="https://www.facebook.com/BillArnoldTeachesDivinePlan" target="_blank" rel="noopener noreferrer"><SiFacebook /></a> |&nbsp;
                    <a title="twitter" href="https://twitter.com/BillArnoldTeach" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a> |&nbsp;
                    <a title="tiktok" href="https://www.tiktok.com/@littleone9939" target="_blank" rel="noopener noreferrer"><PiTiktokLogoBold /></a> |&nbsp;
                    <a title="instagram" href="https://www.instagram.com/littleone9939/" target="_blank" rel="noopener noreferrer"><BsInstagram /></a>
                </div>

                {/* Quick Links */}
                <div style={{ color: "white" }}>
                    <a href="/about">About Us</a> |&nbsp;
                    <a href="/terms">Terms of Service</a> |&nbsp;
                    <a href="/privacy">Privacy Policy</a>
                </div>

                {/* Copyright */}
                <div style={{ color: "white" }}>
                    © {currentYear} littleone.life. All Rights Reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer;