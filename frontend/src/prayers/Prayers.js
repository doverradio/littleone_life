import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../api/authHook';
import prayerSettingsIcon from '../components/otherprayers/prayersettings_icon.png';
import stLeandroRuizIcon from '../components/otherprayers/stleandroruiz/stleandroruiz_icon.png';
import stFrancisIcon from '../components/otherprayers/stfrancis/stfrancis_icon.png';
import stMichaelIcon from '../components/otherprayers/stmichaelprayer/stmichael_icon.png';
import divineMercyIcon from '../components/otherprayers/divinemercy/divinemercy_icon.png';
import confessionIcon from '../components/confession/confession_icon.png';
import massIcon from '../components/mass/mass_icon.png';
import rosaryIcon from '../components/rosary/rosary_icon.png';
import { usePrayerSettings } from '../context/PrayerSettingsContext';
import "./Prayers.css";

const Prayers = () => {
    const { user, token } = useAuth();
    const { prayerSettings, loading } = usePrayerSettings();

    const icons = [
        { id: 'rosary', name: 'Rosary', icon: rosaryIcon, route: '/prayers/rosary' },
        { id: 'mass', name: 'Mass', icon: massIcon, route: '/prayers/mass' },
        { id: 'confession', name: 'Confession', icon: confessionIcon, route: '/prayers/confession' },
        { id: 'divineMercy', name: 'Divine Mercy', icon: divineMercyIcon, route: '/prayers/divinemercy' },
        { id: 'stMichaelPrayer', name: 'St. Michael Prayer', icon: stMichaelIcon, route: '/prayers/stmichael' },
        { id: 'stfrancis', name: 'St. Francis Prayer', icon: stFrancisIcon, route: '/prayers/stfrancis' },
        { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer', icon: stLeandroRuizIcon, route: '/prayers/stleandroruiz' },
        { id: 'prayerSettings', name: 'Prayer Settings', icon: prayerSettingsIcon, route: '/prayers/settings' },
    ];

    const visiblePrayers = icons.filter(icon => {
        const prayerSetting = prayerSettings.find(prayer => prayer.id === icon.id);
        return prayerSetting ? prayerSetting.isVisible : false;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="prayers-container">
            <div className="prayers-content">
                <div className="row justify-content-center align-items-center">
                    {user?.firstName ? (
                        <h2 className="header-font mt-2">{user.firstName}'s Prayers</h2>
                    ) : (
                        <h2 className="header-font mt-2">My Prayers</h2>
                    )}
                </div>
                <div className="prayer-icons">
                    {visiblePrayers.map(icon => (
                        <Link to={icon.route} key={icon.id}>
                            <div className="prayer-icon">
                                <img src={icon.icon} alt={icon.name} />
                                <p>{icon.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Prayers;
