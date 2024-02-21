import React, { useState, useEffect }  from "react";
import NavbarMain from "../NavbarMain";
import Footer from "../Footer";
import HorizontalList from "./utils/HorizontalList";
import DynamicBackground from "../components/background/DynamicBackground";

const UserDashboard = () => {
    const [backgroundColor, setBackgroundColor] = useState('white'); // Default background color
    
    return (
        <>
            <DynamicBackground color={backgroundColor} />
            <NavbarMain backgroundColor={backgroundColor} />
            <HorizontalList setBackgroundColor={setBackgroundColor}/>
            <Footer backgroundColor={backgroundColor} />
        </>
    );    
}

export default UserDashboard;
