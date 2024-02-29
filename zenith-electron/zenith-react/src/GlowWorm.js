import React, { useState } from 'react';
import './GlowWorm.scss';
import ShadowView from './ShadowView';

const GlowWorm = () => {
  const [showShadow, setShowShadow] = useState(false); // Control ShadowView visibility

  const onHoverHandle = () => {
    const circles = document.querySelectorAll('.circle');

    circles.forEach((circle, index) => {
      setTimeout(() => {
        circle.style.display = 'none';
        setShowShadow(true)
      }, 500 + index * 50); 
    });
  };

  return (
    <>
      {showShadow && <ShadowView />} {/* Conditionally render ShadowView */}
      <div className="parent">
        {Array.from({ length: 12 }).map((_, index) => (
          <div 
            key={index} 
            className="circle" 
            onMouseEnter={onHoverHandle}
            style={{ '--i': index }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default GlowWorm;