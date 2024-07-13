import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../../api/auth";
import { useUser } from '../../context/UserContext';

import "./UserDashboard.css"; // Ensure you have this CSS file
import { getUserPrayerStats } from "../../api/user";

const UserDashboard = () => {
    const { user } = useUser(); // Access user from UserContext
    const {
        user: { firstName, _id: userId },
        token
    } = isAuthenticated();
    
    const [userStats, setUserStats] = useState({
        rosaries: 0,
        masses: 0,
        confessions: 0,
        divineMercies: 0
    });

    useEffect(() => {
        const fetchUserStats = async () => {
            try {
                const stats = await getUserPrayerStats(userId, token);
                setUserStats(stats);
            } catch (error) {
                console.error("Error fetching user stats:", error);
            }
        };

        fetchUserStats();
    }, [userId, token]);

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <div className="row justify-content-center align-items-center">
                        {
                            firstName ?
                            <><h2 className="header-font mt-2">{firstName}'s Faith Journey</h2></>
                            : <><h2 className="header-font mt-2">My Faith Journey</h2></>
                        }
                    </div>
                    <div className="user-stats">
                        <h3>User Stats</h3>
                        <p>Rosaries: {userStats.rosaries}</p>
                        <p>Masses: {userStats.masses}</p>
                        <p>Confessions: {userStats.confessions}</p>
                        <p>Divine Mercy Chaplets: {userStats.divineMercies}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDashboard;
