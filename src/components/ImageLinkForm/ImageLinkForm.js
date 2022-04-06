import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className="ImageLinkForm">
            <p>
                {'This app will detect faces in your pictures'}
            </p>
            <div className="ImageLinkForm-form">
                <input id="input" type="text" onChange={onInputChange} />
                <button onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;