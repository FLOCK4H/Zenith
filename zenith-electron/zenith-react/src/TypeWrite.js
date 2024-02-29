import React, { useState, useEffect, forwardRef } from 'react';

const TypeWrite = forwardRef(({ text, css_class, typingSpeed = 50, startDelay = 500 }, ref) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const lineBreakMarker = "\n";

  useEffect(() => {
    const startTypingTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);

    return () => clearTimeout(startTypingTimer);
  }, [startDelay]);

  useEffect(() => {
    let typingTimer;
    if (isTyping && text) {
      if (displayedText.length < text.length) {
        typingTimer = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping(false);
      }
    }
    return () => clearTimeout(typingTimer);
  }, [displayedText, isTyping, text, typingSpeed]);

  const renderTextWithLineBreaks = () => {
    return (
      <React.Fragment>
        {displayedText.split(lineBreakMarker).map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {index !== array.length - 1 && <br />}
          </React.Fragment>
        ))}
        {/* {isTyping && <span className="cursor cursor-blink"></span>} */}
      </React.Fragment>
    );
  };

  return <span ref={ref} className={css_class}>{renderTextWithLineBreaks()}</span>;
});

export default TypeWrite;