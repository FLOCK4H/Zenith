import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CodePerfect = ({ chunk, colorMap, cssClass, currentLine, cursorPosition }) => {
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    


    const renderCursor = (lineIndex) => {
        if (currentLine - 1 === lineIndex && cursorVisible) {
            const leftOffset = cursorPosition + 'ch';
    
            const cursorStyle = {
                position: 'absolute',
                left: leftOffset,
                borderLeft: '2px solid rgba(255,255,255,0.9)',
                height: '0.7rem'
            };
            return <div style={cursorStyle} />;
        }
        return null;
    };

    const parseLine = (line, lineIndex) => {
        let elements = [];
        let position = 0;
    
        const regex = /(["'])(?:(?=(\\?))\2.)*?\1|#.*$|\b\w+\b/g;
    
        let match;
        while ((match = regex.exec(line)) !== null) {
            const textBeforeMatch = line.substring(position, match.index);
            if (textBeforeMatch) {
                elements.push(
                    <span key={`line-${lineIndex}-pos-${position}`} style={{ color: 'inherit' }}>
                        {textBeforeMatch}
                    </span>
                );
            }
    
            let color;
            if (match[0].startsWith('"') || match[0].startsWith("'")) {
                color = colorMap.rule.string || '#ce9178';
            } else if (match[0].startsWith('#')) {
                color = 'gray';
            } else {
                color = colorMap.rule[match[0]] || 'inherit';
            }
    
            elements.push(
                <span key={`line-${lineIndex}-match-${position}`} style={{ color }}>
                    {match[0]}
                </span>
            );
    
            position = regex.lastIndex;
        }
    
        const textAfterLastMatch = line.substring(position);
        if (textAfterLastMatch) {
            elements.push(
                <span key={`line-${lineIndex}-end`} style={{ color: 'inherit' }}>
                    {textAfterLastMatch}
                </span>
            );
        }
    
        return elements;
    };

    const applyColorMap = (text) => {
        return text.split('\n').map((line, lineIndex) => {
            const isEmptyLine = line.trim() === '';
            if (isEmptyLine) {
                return <div key={lineIndex}>&nbsp;</div>;
            }

            const lineStyle = lineIndex === currentLine ? { backgroundColor: 'rgba(20,20,55,1)' } : {};
            return (
                <div key={`line-${lineIndex}`} style={{ ...lineStyle, whiteSpace: 'pre-wrap', position: 'relative' }}>
                    {parseLine(line, lineIndex)}
                    {renderCursor(lineIndex)}
                </div>
            );
        });
    };

    return <div className={cssClass}>{applyColorMap(chunk)}</div>;
};

CodePerfect.propTypes = {
    chunk: PropTypes.string.isRequired,
    colorMap: PropTypes.object.isRequired,
    cssClass: PropTypes.string,
    currentLine: PropTypes.number,
    cursorPosition: PropTypes.number
};

export default CodePerfect;