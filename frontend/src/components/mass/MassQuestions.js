import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import ButtonLoader from "../../loaders/ButtonLoader";

const MassQuestions = ({ 
    userChurches, 
    showChurchForm, 
    setShowChurchForm, 
    submitNewChurch,
    handleChurchChange,
    newChurch,
    massImage,
    selectedMassTime,
    handleMassTimeChange,
    massTimesOptions,
    prayerIntentions,
    editingIntentionId,
    handleUpdateIntention,
    setEditContent,
    setEditingIntentionId,
    handleDeleteIntention,
    selectedIntentions,
    handleIntentionCheckboxChange,
    handleEditClick,
    isAddingIntention,
    handleNewIntentionSubmit,
    newIntention,
    setNewIntention,
    setIsAddingIntention,
    setSpecialIntentions,
    handleSubmitMass,
    isSubmitting,
    count,
    handleChurchSelection,
    editContent
}) => {
    return(
        
        <div>
        {/* Content of the Mass component */}            
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
                            <label style={{ fontSize: '15px' }} htmlFor={church._id}>&nbsp;&nbsp;{church.name}</label>
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
                    src={massImage} 
                    alt={`Mass Image`} 
                    style={{ width: '250px', height: '250px' }} 
                />
            </div>
        </div>
        <hr />
        
        <div className="row">
            <div className="col-md-5 offset-md-2">
                <select value={selectedMassTime} onChange={handleMassTimeChange} className="form-control">
                    <option value="">Select Mass Time</option>
                    {massTimesOptions.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>
        </div>
        <hr />

        {/* Intentions Section */}
        <div className="row">
            <div className="col-12">
                {
                    prayerIntentions.length > 0 ? (
                        <ul style={{ listStyle: 'none' }}>
                            {
                                prayerIntentions.map(intention => (
                                    <li key={intention._id}>
                                        {
                                            editingIntentionId === intention._id ? (
                                                <form onSubmit={handleUpdateIntention}>
                                                    <textarea
                                                        rows={5}
                                                        className="form-control"
                                                        value={editContent}
                                                        onChange={(e) => setEditContent(e.target.value)}
                                                    />
                                                    <div className="row my-2">
                                                        <div className="col-12">
                                                            <button type="submit" className="btn btn-primary btn-sm m-1">Save</button>
                                                            <button 
                                                                className="btn btn-secondary btn-sm m-1" 
                                                                onClick={() => setEditingIntentionId(null)}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button 
                                                                className='btn btn-danger btn-sm m-1'
                                                                onClick={() => handleDeleteIntention(intention._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                                ) : (
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-1">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={selectedIntentions.includes(intention._id)}
                                                                    onChange={() => handleIntentionCheckboxChange(intention._id)}
                                                                />
                                                            </div>
                                                            <div className="col-9">
                                                                <p style={{ fontSize: '12px', textAlign: 'left', wordBreak: 'break-word' }}>
                                                                    {intention.content}
                                                                </p>
                                                            </div>
                                                            <div className="col-1">
                                                                <span 
                                                                    // className='btn btn-light btn-sm'
                                                                    onClick={() => handleEditClick(intention._id, intention.content)}
                                                                    style={{ fontSize: '9px'}}
                                                                >
                                                                    <MdOutlineModeEdit />
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    ) 
                    : 
                    <p>
                        No intentions added yet.
                    </p>
                }
            </div>
        </div>
        
        {/* Form to Add New Intention */}
        <div className="row">
            <div className="col-12">
                {isAddingIntention ? (
                    <form onSubmit={handleNewIntentionSubmit}>
                        <textarea 
                            className='form-control m-1'
                            value={newIntention}
                            onChange={(e) => setNewIntention(e.target.value)} 
                        />
                        <button type="submit" className='btn btn-outline-secondary btn-sm'>Add</button>
                    </form>
                ) : (
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setIsAddingIntention(true)}>
                        Add intention
                    </button>
                )}
            </div>
        </div>
        <hr />
        <div className="row">
            <div className="col-md-8 offset-md-2">
                <textarea 
                    rows={ 3 }
                    className="form-control m-1"
                    placeholder='Special Intentions'
                    onChange={ e => setSpecialIntentions( e.target.value ) }
                />
            </div>
        </div>
        
        <hr />
        <div className="row">
            <div className="col-12">
                <button 
                    className='btn btn-primary btn-block m-1' 
                    type="submit"
                    onClick={ e => {
                        e.preventDefault()
                        handleSubmitMass()
                    }}
                >
                    
                    
                    {
                        isSubmitting ?
                        <ButtonLoader />
                        : `Submit Mass`
                    }
                </button>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col-12">
                <p>You have attended {count} masses.</p>
            </div>
        </div>
    </div>
    )
}

export default MassQuestions