import React, { useState } from "react";

const AddIconOptions = ({ defaultIcons, onSelectionChange }) => {
    const [selectedIcons, setSelectedIcons] = useState(defaultIcons);

    const handleCheckboxChange = (iconName, isChecked) => {
        setSelectedIcons(prev => ({
            ...prev,
            [iconName]: isChecked,
        }));
        onSelectionChange(iconName, isChecked);
    };

    return (
        <div>
            <h3>Select Prayers</h3>
            <form>
                {/* List all the checkboxes here */}
                {Object.keys(selectedIcons).map((iconName) => (
                    <div key={iconName}>
                        <input
                            type="checkbox"
                            className="form-control"
                            id={iconName}
                            checked={selectedIcons[iconName]}
                            onChange={(e) => handleCheckboxChange(iconName, e.target.checked)}
                        />
                        <label htmlFor={iconName}>{iconName}</label>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default AddIconOptions