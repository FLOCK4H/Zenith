import React, { useEffect, useRef } from 'react';
import './BackBubble.css';

const debounce = (func, delay) => {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
};

const BackBubble = ({ left, right, top, bottom }) => {
    const bgContainerRef = useRef(null);

    return (
        <div ref={bgContainerRef} 
        className="bg-container" 
        style={{ "top": top, "right": right, "left": left, "bottom": bottom }}>

        </div>
    );
};

export default BackBubble;
