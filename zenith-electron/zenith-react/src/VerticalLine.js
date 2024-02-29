import React from 'react';
import './VerticalLine.css'

const VerticalLine = ({ width, height, color="rgba(255,255,255,0.3)" }) => {
    const numericHeight = Number(height.replace(/[^0-9.]/g, ''));
    const calculatedHeight = numericHeight * 2 + 'px'; 

    return (
        <div className="line-box" style={{ height: calculatedHeight }}>
            <div className="line" style={{ width: width, height: height, background: color }}>
            </div>
        </div>
    );
};

export default VerticalLine;