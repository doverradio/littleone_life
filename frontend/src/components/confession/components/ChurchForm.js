// src/components/confession/components/ChurchForm.js

import React from 'react';

const ChurchForm = ({ showChurchForm, setShowChurchForm, submitNewChurch, handleChurchChange, newChurch }) => (
  <div className="form-container">
    {showChurchForm && (
      <form onSubmit={submitNewChurch}>
        <textarea
          rows={3}
          name="name"
          placeholder="Church Name"
          className="form-control m-1"
          onChange={handleChurchChange}
          value={newChurch.name}
          required
        />
        {/* Additional form fields */}
        <button className="btn btn-primary btn-sm m-1" type="submit">Create Church</button>
        <button className="btn btn-danger btn-sm m-1" onClick={() => setShowChurchForm(false)}>Cancel</button>
      </form>
    )}
  </div>
);

export default ChurchForm;
