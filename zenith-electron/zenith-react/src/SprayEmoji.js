import React, { useState, useEffect } from 'react';
import './SprayEmoji.css';

const SprayEmoji = ({ emoji, css_class, spread = 50, duration = {min: 2, max: 3}, delay = {min: 0, max: 0.5} }) => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    const newEmojis = [];
    for (let i = 0; i < 10; i++) {
      // Random start and end positions within the spread range
      const startPosX = Math.random() * spread - (spread / 2);
      const endPosX = Math.random() * spread - (spread / 2);

      // Randomize duration and delay within given range
      const emojiDuration = Math.random() * (duration.max - duration.min) + duration.min;
      const emojiDelay = Math.random() * (delay.max - delay.min) + delay.min;

      newEmojis.push({
        id: i,
        style: {
          left: '50%',
          bottom: '0',
          '--startPosX': `${startPosX}%`,
          '--endPosX': `${endPosX}%`,
          animationDuration: `${emojiDuration}s`,
          animationDelay: `${emojiDelay}s`,
        },
      });
    }
    setEmojis(newEmojis);
  }, [emoji, spread, duration, delay]);

  return (
    <div className={`spray-container ${css_class}`}>
      {emojis.map((emojiObj) => (
        <span
          key={emojiObj.id}
          className="emoji"
          style={emojiObj.style}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default SprayEmoji;