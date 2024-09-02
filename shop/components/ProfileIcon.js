// shop/components/ProfileIcon.js
import React from 'react';

const ProfileIcon = ({ handleSignout, userStats }) => {
    return (
        <div className="profile-icon">
            <button onClick={handleSignout}>Sign Out</button>
            <div>
                <span>{userStats ? `Prayers: ${userStats.prayers}` : 'Loading stats...'}</span>
            </div>
        </div>
    );
};

export default ProfileIcon;
