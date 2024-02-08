import React from "react";
import { Link } from 'react-router-dom';
import './styles.css'
import backgroundImage from './assets/background.jpg'

const MainPageBody = () => {
    return (
        <div 
          className="main-page-body" 
          style={{ 
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh', // This sets the height to full viewport height
              color: 'white' // Assuming you want white text over your image
          }}
        >
            {/* Add your content here */}
            <div className="content-container">
                <h1>Welcome to Littleone.life</h1>
                <p>Your spiritual journey begins here.</p>
                {/* More content can be added here */}
            </div>
        </div>
    );
}

export default MainPageBody;

