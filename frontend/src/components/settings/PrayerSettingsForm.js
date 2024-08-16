import React from 'react';

const PrayerSettingsForm = ({ settings, handleChange }) => {
    const defaultPrayers = [
        { id: 'rosary', name: 'Rosary' },
        { id: 'mass', name: 'Mass' },
        { id: 'confession', name: 'Confession' },
        { id: 'divineMercy', name: 'Divine Mercy Chaplet' },
        { id: 'stMichaelPrayer', name: 'St. Michael Prayer' },
        { id: 'stfrancis', name: 'St. Francis Prayer' },
        { id: 'stleandroruiz', name: 'St. Leandro Ruiz Prayer' }
    ];

    return (
        <div className="form-group">
            <label>Prayer Settings:</label>
            {defaultPrayers.map((prayer, index) => {
                const isChecked = settings.prayerSettings.find(setting => setting.id === prayer.id)?.isVisible || false;
                return (
                    <div key={index} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name={`prayerSettings[${index}].isVisible`}
                            checked={isChecked}
                            onChange={(e) => handleChange({
                                target: {
                                    name: `prayerSettings[${index}].isVisible`,
                                    value: e.target.checked
                                }
                            })}
                        />
                        <label className="form-check-label">
                            {prayer.name}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};

export default PrayerSettingsForm;
