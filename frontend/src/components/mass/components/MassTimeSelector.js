import React, { useEffect, useState } from 'react';
import './MassTimeSelector.css';
import { MASS_TIMES_OPTIONS } from '../constants';

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return { hours, minutes };
};

const findClosestTimeOption = () => {
    const { hours, minutes } = getCurrentTime();
    const currentMinutes = hours * 60 + minutes;

    let closestTime = MASS_TIMES_OPTIONS[0];
    let closestDifference = Infinity;

    MASS_TIMES_OPTIONS.forEach(time => {
        const [hour, minutePart] = time.split(':');
        const minutesPart = minutePart.split(' ')[0];
        const period = minutePart.split(' ')[1];

        let hourNumber = parseInt(hour, 10);
        const minuteNumber = parseInt(minutesPart, 10);

        if (period === 'P.M.' && hourNumber !== 12) {
            hourNumber += 12;
        } else if (period === 'A.M.' && hourNumber === 12) {
            hourNumber = 0;
        }

        const timeMinutes = hourNumber * 60 + minuteNumber;
        const difference = Math.abs(currentMinutes - timeMinutes);

        if (difference < closestDifference) {
            closestDifference = difference;
            closestTime = time;
        }
    });

    return closestTime;
};

const MassTimeSelector = ({ selectedMassTime, handleMassTimeChange, massTimesOptions }) => {
    const [currentSelectedTime, setCurrentSelectedTime] = useState(findClosestTimeOption());

    useEffect(() => {
        setCurrentSelectedTime(findClosestTimeOption());
    }, []);

    const handleChange = (event) => {
        setCurrentSelectedTime(event.target.value);
        handleMassTimeChange(event);
    };

    return (
        <div className="form-group">
            <hr />
            <h3>Select Mass Time</h3>
            <div className="clock-display">
                {currentSelectedTime}
            </div>
            <div className="select-container">
                <sup>Choose mass time</sup>
                <select 
                    id="massTime" 
                    className="form-control select-increased-width" 
                    value={currentSelectedTime || ''} 
                    onChange={handleChange}
                >
                    <option value="" disabled>Select a mass time</option>
                    {massTimesOptions.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MassTimeSelector;
