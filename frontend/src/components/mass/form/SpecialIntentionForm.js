import React from 'react';

const SpecialIntentionForm = ({ setSpecialIntentions }) => (
    <div className="row">
        <div className="col-md-8 offset-md-2">
            <textarea 
                rows={3}
                className="form-control m-1"
                placeholder='Special Intentions'
                onChange={e => setSpecialIntentions(e.target.value)}
            />
        </div>
    </div>
);

export default SpecialIntentionForm;
