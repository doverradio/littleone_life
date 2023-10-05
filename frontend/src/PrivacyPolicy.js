import React from 'react';
import NavbarMain from "./NavbarMain";
import Footer from './Footer';

const PrivacyPolicy = () =>
{
    return(
        <>
            <NavbarMain />
            <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", backgroundColor: "black" }}>
                <h1 className='m-1 p-1 text-center' style={{ color: "white" }}>Privacy Policy</h1>
                <p style={{ color: "white" }}>Last updated: 10/04/2023</p>
                
                <h2 style={{ color: "white" }}>Introduction</h2>
                <p style={{ color: "white" }}>Thank you for using our services! We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we treat your personal data when you visit our website or use our services and tell you about your 
                privacy rights and how the law protects you.</p>
                
                <h2 style={{ color: "white" }}>Personal Data We Collect</h2>
                <ul>
                    <li style={{ color: "white" }}><strong>Contact Data.</strong> Includes email address, telephone number, and physical address.</li>
                    <li style={{ color: "white" }}>
                        <strong>Technical Data.</strong> Includes internet protocol (IP) address, browser type and version, 
                        time zone setting and location, browser plug-in types and versions, operating system, and platform, and other technology on the devices 
                        you use to access this website.
                    </li>
                </ul>
                
                <h2 style={{ color: "white" }}>How We Use Your Personal Data</h2>
                <p style={{ color: "white" }}>We use your data to provide and improve our services. By using our services, you agree to the collection and use of information as described in this policy.</p>

                <h2 style={{ color: "white" }}>Third-Party Services</h2>
                <p style={{ color: "white" }}>We may employ third-party companies and individuals to facilitate our services, provide services on our behalf, or assist us in analyzing how our services are used. These third parties have access to your data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
                
                <h2 style={{ color: "white" }}>Changes to This Privacy Policy</h2>
                <p style={{ color: "white" }}>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this page. You are advised to review this Privacy Policy periodically for any changes.</p>
                
                <h2 style={{ color: "white" }}>Contact Us</h2>
                <p style={{ color: "white" }}>If you have any questions about this Privacy Policy, please <a href="/contact">contact us</a>.</p>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPolicy