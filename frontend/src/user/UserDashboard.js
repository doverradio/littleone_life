import React from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";

const UserDashboard = () => {
    return (
        <>
            <NavbarMain />
            <div className="container" style={{ height: '73vh' }}>
                <div className="row justify-content-center align-items-center">
                    <h2>User Dashboard</h2>
                    {/* Add your user dashboard content here */}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserDashboard;
