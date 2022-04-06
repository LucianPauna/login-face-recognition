import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className="FaceRecognition">
            <div className="FaceRecognition-inner">
                <img id="inputImage" src={imageUrl} alt=""/>
                {
                    boxes.map((box, i) => {
                        return (
                            <div key={i} className="BoundingBox" style={{top: box.top, left: box.left, bottom: box.bottom, right: box.right}}></div>
                        )
                    })
                }
                
            </div>
        </div>
    )
}

export default FaceRecognition;