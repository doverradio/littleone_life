import React from "react";
import { SiFacebook, SiRumble } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { PiTiktokLogoBold } from "react-icons/pi";
import { BsYoutube } from "react-icons/bs";
import { FcReddit } from "react-icons/fc";

const Footer = () =>
{
    const currentYear = new Date().getFullYear();
    return (
        <footer style={{backgroundColor: "white", padding: "20px 0"}}>
            <div style={{display: "flex", justifyContent: "space-around", alignItems: "center", flexDirection: "column", width: "80%", margin: "0 auto"}}>

                {/* Social Media Icons */}
                <div style={{ color: "black" }}>
                    <a title="Youtube" href="https://www.youtube.com/@littleone9939" target="_blank" rel="noopener noreferrer"><img src="/youtube.png" style={{ height: "18px", width: "18px" }} alt="YouTube" /></a> |&nbsp;
                    <a title="Facebook" href="https://www.facebook.com/BillArnoldTeachesDivinePlan" target="_blank" rel="noopener noreferrer"><SiFacebook /></a> |&nbsp;
                    <a title="Twitter (X)" href="https://twitter.com/BillArnoldTeach" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a> |&nbsp;
                    <a title="TikTok" href="https://www.tiktok.com/@littleone9939" target="_blank" rel="noopener noreferrer"><img src="/tiktok.png" style={{ height: "18px", width: "18px" }} alt="TikTok" /></a> |&nbsp;
                    <a title="Reddit" href="https://www.reddit.com/user/littleone9939" target="_blank" rel="noopener noreferrer"><FcReddit /></a> |&nbsp;
                    <a title="Rumble" href="https://rumble.com/user/littleone9939" target="_blank" rel="noopener noreferrer"><img src="/rumble.png" style={{ height: "18px", width: "18px" }} alt="Rumble" /></a> |&nbsp;
                    <a title="TruthSocial" href="https://truthsocial.com/@littleone9939" target="_blank" rel="noopener noreferrer"><img src="/truth-social-logo.png" style={{ height: "18px", width: "18px" }} alt="TruthSocial" /></a> |&nbsp;
                    <a title="Instagram" href="https://www.instagram.com/littleone9939/" target="_blank" rel="noopener noreferrer"><img src="/instagram.png" style={{ height: "18px", width: "18px" }} alt="Instagram" /></a>
                </div>

                {/* Quick Links */}
                <div style={{ color: "black" }}>
                    <a href="/about">About Us</a> |&nbsp;
                    <a href="/terms">Terms of Service</a> |&nbsp;
                    <a href="/privacy">Privacy Policy</a>
                </div>

                {/* Copyright */}
                <div style={{ color: "black" }}>
                    © {currentYear} littleone.life. All Rights Reserved.
                </div>

            </div>
        </footer>
    )
}

export default Footer;