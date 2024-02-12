import React, { useState, useEffect } from 'react';
import { getAllIntentions, createIntention, updateIntention, deleteIntention } from '../../api/intentions';
import { createMassAttendance, countMassesByUser } from '../../api/massAttendance'; 
import { isAuthenticated } from '../../api/auth';
import { MdOutlineModeEdit } from "react-icons/md";
import massIcon from './mass_icon.png'

const Mass = () => {
    // State and functions for the Mass component
    
    const {
        user: { _id }
    } = isAuthenticated();

    const userId = _id;

    return (
        <div className="mass-component container">
            <div className="row">
                <div className="col-3">
                    <img 
                        src={massIcon} 
                        alt="Mass" 
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
                        Mass
                    </h1>
                </div>
            </div>
            <hr />
            {/* Content of the Mass component */}
        </div>
    );
};

export default Mass;
