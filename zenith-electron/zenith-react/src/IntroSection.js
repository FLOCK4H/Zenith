import React, { useRef, useEffect } from 'react';
import './IntroSection.css';
import './Dashboard.css';
import TypeWrite from './TypeWrite';
import NotifyBubble from './NotifyBubble';
import UserIcon from './user_icon.svg';
import { useUsername } from './UsernameContext';
import DaughterWidgets from './DaughterWidgets';
import FeatureBox from './FeatureBox';
import VerticalLine from './VerticalLine'


function IntroSection({ showChat }) {
  const typeWriteRef = useRef(null);
  const { username } = useUsername();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = typeWriteRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (clientX - centerX) * 0.1;
      const deltaY = (clientY - centerY) * 0.1;
      const textShadow = `${deltaX}px ${deltaY}px 10px rgba(0, 255, 255, 0.9)`;

      typeWriteRef.current.style.transition = "transform 1.0s ease, textShadow 1.0s ease";
      typeWriteRef.current.style.textShadow = textShadow;
      typeWriteRef.current.style.transform = "scale(1.1)"
    };

    const handleMouseLeave = () => {
      typeWriteRef.current.style.transition = "all 1.0s ease";
      typeWriteRef.current.style.textShadow = '5px 5px 10px rgba(0, 255, 255, 0.6)';
      typeWriteRef.current.style.transform = "scale(1.0)"
    };

    const typeWriteEl = typeWriteRef.current;
    // typeWriteEl.style.marginLeft = "100px";
    typeWriteEl.addEventListener('mousemove', handleMouseMove);
    typeWriteEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      typeWriteEl.removeEventListener('mousemove', handleMouseMove);
      typeWriteEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="intro-section">
      <NotifyBubble img={UserIcon} text={`Hi, ${username}`} css_class="text-r pimp-text f-cust" />
      <div className="intro-container-link">
        <div className="intro-text-container">
          <TypeWrite ref={typeWriteRef} text="What is on your mind today?" css_class="blend-text text-c width-mod pimp-text f-3r trs-transf" />
        </div>
        <VerticalLine width="0.5px" height="25px" />
        <FeatureBox showChat={showChat}/>
      </div>

        <DaughterWidgets />

    </div>
  );
}

export default IntroSection;