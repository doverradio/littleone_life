import React from 'react';

const AiModelSettingsForm = ({ settings, handleChange }) => (
    <div className="form-group">
        <label>Select AI Model:</label>
        <select
            name="aiModel"
            value={settings.aiModel}
            onChange={handleChange}
            className="form-control"
        >
            <option value="gpt-3.5-turbo">Basic AI ($0.004 per token)</option>
            <option value="gpt-4">Advanced AI ($0.06 per token)</option>
        </select>
    </div>
);

export default AiModelSettingsForm;
