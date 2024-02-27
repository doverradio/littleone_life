import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import ButtonLoader from "../../loaders/ButtonLoader";

const ConfessionQuestions = ({ 
    userChurches, 
    showChurchForm, 
    setShowChurchForm, 
    submitNewChurch,
    handleChurchChange,
    newChurch,
    confessionImage,
    confessionTime,
    setConfessionTime,
    handleChurchSelection,
    handleSubmitConfession,
    hasConfessions,
    daysSinceLastConfession,
}) => {
    return(
        <>
            <div className='container'>
                {/* Content for Questions tab */}
                
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                        <form>
                            {userChurches.map(church => (
                                <div key={church._id} className="radio-button-container">
                                    <input 
                                        type="radio" 
                                        id={church._id} 
                                        name="churchSelection" 
                                        value={church._id} 
                                        onChange={handleChurchSelection} 
                                    />
                                    <label htmlFor={church._id}>&nbsp;&nbsp;{church.name}</label>
                                </div>
                            ))}
                        </form>
                        <div className="row">
                            <div className="col-12">
                                <button 
                                    className='btn btn-outline-secondary btn-sm m-1' 
                                    onClick={() => setShowChurchForm(true)}
                                    title='Add new church'
                                >
                                    <span style={{ fontSize: '10px' }}>Add New Church</span>
                                </button>
                                <div className="form-container">
                                    {showChurchForm && (
                                            <form onSubmit={submitNewChurch}>
                                                <textarea
                                                    rows={ 3 }
                                                    name="name" 
                                                    placeholder="Church Name" 
                                                    className='form-control m-1'
                                                    onChange={handleChurchChange}
                                                    value={newChurch.name} 
                                                    required 
                                                />
                                                <input
                                                    type="text"
                                                    name="address" 
                                                    placeholder="Address" 
                                                    className='form-control m-1'
                                                    onChange={handleChurchChange}
                                                    value={newChurch.address} 
                                                />
                                                <input
                                                    type="text"
                                                    name="city" 
                                                    placeholder="City" 
                                                    className='form-control m-1'
                                                    onChange={handleChurchChange}
                                                    value={newChurch.city} 
                                                />
                                                <input
                                                    type="text"
                                                    name="state" 
                                                    placeholder="State" 
                                                    className='form-control m-1'
                                                    onChange={handleChurchChange}
                                                    value={newChurch.state} 
                                                />
                                                <input
                                                    type="text"
                                                    name="zipCode" 
                                                    placeholder="Zip" 
                                                    className='form-control m-1'
                                                    onChange={handleChurchChange}
                                                    value={newChurch.zipCode} 
                                                />
                                                <input
                                                    type="text"
                                                    name="phone" 
                                                    placeholder="Phone" 
                                                    className='form-control m-1'
                                                    onChange={handleChurchChange}
                                                    value={newChurch.phone} 
                                                />
                                                <input
                                                    type="text"
                                                    name="website" 
                                                    placeholder="Website" 
                                                    className='form-control m-1'
                                                    onChange={handleChurchChange}
                                                    value={newChurch.website} 
                                                />
                                                <button className='btn btn-primary btn-sm m-1' type="submit">Create Church</button>
                                                <button className='btn btn-danger btn-sm m-1' onClick={() => setShowChurchForm(false)}>Cancel</button>
                                            </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <img 
                            src={confessionImage} 
                            alt={`Confession Image`} 
                            style={{ width: '220px', height: '220px' }} 
                        />
                    </div>
                </div>
                <hr />
                <form>
                    <div className="row form-group">
                        <div className="col-md-4">
                            <label htmlFor="confessionTime" className="col-form-label">Confession Time:</label>
                        </div>
                        <div className="col-md-8">
                            <input 
                                type="datetime-local" 
                                className="form-control" 
                                id="confessionTime" 
                                value={confessionTime} 
                                onChange={(e) => setConfessionTime(e.target.value)}
                            />
                        </div>
                    </div>
                        
                    <div className="text-center" style={{ marginBottom: '20px' }}>
                        <button 
                            type="button" 
                            className="btn btn-primary btn-block"
                            onClick={handleSubmitConfession}
                        >
                            Submit Confession
                        </button>
                    </div>
                    
                </form>
                
                <div className="confession-count">
                    {hasConfessions ? (
                        <p>Days since last confession: {daysSinceLastConfession}</p>
                    ) : (
                        <p style={{ fontWeight: 'bold' }}>Please go to confession and enter your first one above.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default ConfessionQuestions