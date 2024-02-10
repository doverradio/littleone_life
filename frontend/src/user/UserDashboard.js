import React, { useState }  from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import Modal from "./Modal";
import Rosary from "../components/rosary/Rosary";
import rosaryIcon from '../components/rosary/rosary_icon.png'

const UserDashboard = () => {
    const [isRosaryModalOpen, setIsRosaryModalOpen] = useState(false);

    const toggleRosaryModal = () => {
        setIsRosaryModalOpen(!isRosaryModalOpen);
    };
    return (
        <>
            <NavbarMain />
            <div className="container" style={{ height: '73vh' }}>
                <div className="row justify-content-center align-items-center">
                    <h2>User Dashboard</h2>
                    {/* Add your user dashboard content here */}
                </div>
                <div className="row">
                    <div className="col-12">
                        <img 
                            src={rosaryIcon} 
                            alt="Rosary" 
                            className="clickable-icon" 
                            style={{
                                height: '55px',
                                width: '55px',
                                cursor: 'pointer'
                            }}
                            title="Rosary"
                            onClick={toggleRosaryModal} 
                        />
                        
                        <Modal show={isRosaryModalOpen} onHide={toggleRosaryModal}>
                            <Rosary />
                        </Modal>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserDashboard;
