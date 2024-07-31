import React from 'react';

const MassAttendance = ({
    userChurches,
    nearbyChurches,
    handleChurchSelection,
    selectedMassTime,
    handleMassTimeChange,
    massTimesOptions,
    selectedChurch,
    addChurchToMassOptions,
    token // Ensure token is passed as a prop
}) => (
    <div className='mt-3'>
        <h3>Mass Attendance</h3>
        <div className="form-group">
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <table className="table table-bordered">
                    <tbody>
                        {[...userChurches, ...nearbyChurches].map((church, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="radio"
                                        id={church._id || index}
                                        name="churchSelection"
                                        value={church._id || index}
                                        onChange={() => handleChurchSelection(church)}
                                    />
                                </td>
                                <td title={`${church.name}, ${church.address}, ${church.city}, ${church.state}`}>
                                    {church.name} - {church.address}
                                </td>
                                <td>
                                    {!userChurches.some(userChurch => userChurch.placeId === church.placeId) && (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            title="Add church to user churches"
                                            onClick={() => addChurchToMassOptions(church, token)}
                                        >
                                            +
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="massTime">Select Mass Time</label>
            <select
                id="massTime"
                className="form-control"
                value={selectedMassTime || ''}
                onChange={handleMassTimeChange}
            >
                <option value="" disabled>Select a mass time</option>
                {massTimesOptions.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                ))}
            </select>
        </div>
    </div>
);

export default MassAttendance;
