import React from "react";
import NavbarMain from "./NavbarMain";
import Footer from "./Footer";

const TermsOfService = () =>
{
    return (
        <>
            <NavbarMain />
            <div className="container-fluid" style={{ maxWidth: "800px", margin: "40px auto", lineHeight: "1.6", backgroundColor: 'black' }}>
                <h1 className="text-center" style={{ color: "white" }}>Terms of Service</h1>

                <h2 className="m-1 p-1" style={{ color: "white" }}>1. Acceptance of Terms</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    By accessing and using <strong>littleone.life</strong>'s services, you accept and agree to be bound by the terms and provisions of this agreement.
                </p>

                <h2 className="m-1 p-1" style={{ color: "white" }}>2. Changes to Terms</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    <strong>littleone.life</strong> may revise these terms at any time without notice. By using this service, you are agreeing to be bound by the current version of these Terms of Service.
                </p>

                <h2 className="m-1 p-1" style={{ color: "white" }}>3. Use License</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    Permission is granted to temporarily download one copy of the materials on <strong>littleone.life</strong>'s website for personal, non-commercial transitory viewing only.
                </p>

                <h2 className="m-1 p-1" style={{ color: "white" }}>4. Account Security</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
                </p>

                <h2 className="m-1 p-1" style={{ color: "white" }}>5. Termination</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    <strong>littleone.life</strong> may terminate your access to the services, without cause or notice, which may result in the forfeiture and destruction of all information associated with your account.
                </p>

                <h2 className="m-1 p-1" style={{ color: "white" }}>6. Governing Law</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    These terms and conditions are governed by and construed in accordance with the laws of [Your State or Country] and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
                </p>

                <h2 className="m-1 p-1" style={{ color: "white" }}>7. Limitations</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    In no event shall <strong>littleone.life</strong> be liable for any damages arising out of the use or inability to use the materials on <strong>littleone.life</strong>'s website.
                </p>

                <h2 className="m-1 p-1" style={{ color: "white" }}>8. Revisions</h2>
                <p className="m-1 p-1" style={{ color: "white" }}>
                    The materials appearing on <strong>littleone.life</strong>'s website may include technical, typographical, or photographic errors.
                </p>

                {/* ... Additional sections as needed ... */}

                <p className="m-1 p-1" style={{ color: "white" }}>
                    If you have any questions about these Terms, please <a href="/contact">contact us</a>.
                </p>
            </div>
            <Footer />
        </>
    );
}

export default TermsOfService