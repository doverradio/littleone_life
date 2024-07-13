import React from 'react';

const AddIntentionForm = ({ isAddingIntention, handleNewIntentionSubmit, newIntention, setNewIntention, setIsAddingIntention }) => (
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
);

export default AddIntentionForm;
