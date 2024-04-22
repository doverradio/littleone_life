import React, { useState } from "react";
import Self from "../Self";
import Society from "../Society";
import God from "../God";
import './styles.css'

const HorizontalList = ({setBackgroundColor}) => {
    const [activeTab, setActiveTab] = useState("God");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }

    return (
        <>
            <div className="row justify-content-center align-items-center">
                <ul className="horizontal-list">
                    <li style={{cursor: 'pointer'}} className={activeTab === "God" ? "active-tab" : ""} onClick={() => handleTabClick("God")}>God</li>
                    <li style={{cursor: 'pointer'}} className={activeTab === "Self" ? "active-tab" : ""} onClick={() => handleTabClick("Self")}>Self</li>
                    <li style={{cursor: 'pointer'}} className={activeTab === "Society" ? "active-tab" : ""} onClick={() => handleTabClick("Society")}>Society</li>
                </ul>
            </div>
            <div className="tab-content" style={{ height: '73vh' }}>
                {activeTab === "God" && <God setBackgroundColor={setBackgroundColor} />}
                {activeTab === "Self" && <Self setBackgroundColor={setBackgroundColor} />}
                {activeTab === "Society" && <Society setBackgroundColor={setBackgroundColor} />}
            </div>
        </>
    )
}

export default HorizontalList;
