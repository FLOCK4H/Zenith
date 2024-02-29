import React, { useRef, useEffect } from 'react';
import './UtilBar.scss';

const UtilBar = () => {
  const leftCircleRef = useRef(null);
  const rightCircleRef = useRef(null);
  const animationDuration = 500; // Duration in milliseconds

  const setStayStillAnimation = () => {
    leftCircleRef.current.style.animation = 'stayStill 10s infinite';
    rightCircleRef.current.style.animation = 'stayStill 10s infinite';
  };

  const handleMouseEnter = () => {
    leftCircleRef.current.style.animation = 'moveLeftCircle 0.5s forwards';
    rightCircleRef.current.style.animation = 'moveRightCircle 0.5s forwards';
  };

  const handleMouseLeave = () => {
    leftCircleRef.current.style.animation = 'returnCircle 0.5s forwards';
    rightCircleRef.current.style.animation = 'returnCircle 0.5s forwards';
    setTimeout(setStayStillAnimation, animationDuration); // Schedule the switch to stayStill
  };

  useEffect(() => {
    setStayStillAnimation(); // Initialize the animation on component mount
  }, []);

  return (
    <div className="util-bar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={leftCircleRef} className="circle left-circle"></div>
      <div ref={rightCircleRef} className="circle right-circle"></div>
    </div>
  );
};

export default UtilBar;
