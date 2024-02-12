import React, { useState, useEffect } from 'react';
// import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
// import { createMassAttendance, countMassesByUser } from '../../api/massAttendance'; 
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import confessionIcon from './confession_icon.png'
import './styles.css'

const Confession = () => {
    const [lastConfessionDate, setLastConfessionDate] = useState('');
    const [daysSinceLastConfession, setDaysSinceLastConfession] = useState(0);

    const handleDateChange = (event) => {
        setLastConfessionDate(event.target.value);
        calculateDaysSince(event.target.value);
    };

    const {
        user: { _id }
    } = isAuthenticated();

    const userId = _id;

    const calculateDaysSince = (date) => {
        const lastConfession = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(today - lastConfession);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysSinceLastConfession(diffDays);
    };

    return (
        <div className="confession-component">
            <div className="row">
                <div className="col-3">
                    <img 
                        src={confessionIcon} 
                        alt="Confession" 
                        className="mass-icon" 
                        style={{
                            height: '55px',
                            width: '55px',
                            cursor: 'pointer'
                        }}
                    />
                </div>
                <div className="col-9">
                    <h1 className="m-1 header-font">
                        Confession
                    </h1>
                </div>
            </div>
            <hr />
            <form>
                <div className="form-group">
                    <label htmlFor="lastConfessionDate">Last Confession Date:</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        id="lastConfessionDate" 
                        value={lastConfessionDate} 
                        onChange={handleDateChange}
                    />
                </div>
                <p>Days since last confession: {daysSinceLastConfession}</p>
                {/* Add more fields or functionalities as needed */}
            </form>
        </div>
    );
};

export default Confession;
