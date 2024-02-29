import React, { forwardRef, useState, useRef, useEffect } from 'react';
import './DashNotes.css';
import './CodeWidgets.css';
import CodePerfect from './CodePerfect';
import colorMap from './CodePerfectColors.json';
import ArrowDown from './arrow_down.svg';

const DashNotes = forwardRef(({ onClick }, ref) => {
    const [noteContent, setNoteContent] = useState("# Run the code by pressing ctrl+e key while inside the Notebook\nprint('Hello World')\n# Tab adds two spaces for brevity\n");
    const textAreaRef = useRef(null);
    const movableRef = useRef(null);
    const [currentLine, setCurrentLine] = useState(0);
    const [pos, setCursorPosition] = useState(0);
    // Drag-related state and functions
    const [dragging, setDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0, width: '250px', height: '256px' });

    const onDragStart = (e) => {
        setDragging(true);
        setDragStart({ x: e.clientX - originalPosition.x, y: e.clientY - originalPosition.y });
        e.preventDefault();
    };

    let savedX = 0;
    let savedY = 0;
    const onDragMove = (e) => {
        if (dragging) {
            const newX = e.clientX - dragStart.x;
            const newY = e.clientY - dragStart.y;

            movableRef.current.style.left = `${newX}px`;
            movableRef.current.style.top = `${newY}px`;

            savedX = newX;
            savedY = newY;
        }
    };

    const onDragEnd = () => {
        if (dragging) {
            const finalPosition = movableRef.current.getBoundingClientRect();
            setOriginalPosition({
                x: savedX,
                y: savedY,
                width: finalPosition.width,
                height: finalPosition.height
            });
            setDragging(false);
        }
    };

    useEffect(() => {
        if (dragging) {
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);
        } else {
            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('mouseup', onDragEnd);
        }

        return () => {
            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('mouseup', onDragEnd);
        };
    }, [dragging, dragStart, originalPosition]);

    const handleNoteContentChange = e => {
        setNoteContent(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            insertAtCaret('  ');
        } else if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            window.electronAPI.executePythonScript(noteContent);
        }
    };

    const insertAtCaret = (textToInsert) => {
        const start = textAreaRef.current.selectionStart;
        const end = textAreaRef.current.selectionEnd;
        const text = textAreaRef.current.value;
        const newText = text.substring(0, start) + textToInsert + text.substring(end);
        setNoteContent(newText);
        
        setTimeout(() => {
            textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = start + textToInsert.length;
        }, 0);
    };

    const handleCursorPositionChange = () => {
        const textarea = textAreaRef.current;
        const text = textarea.value;
        const caretPosition = textarea.selectionStart;
        const lines = text.substring(0, caretPosition).split("\n");
        const line = lines.length - 1;
        const column = lines[lines.length - 1].length;
        
        setCurrentLine(line);
        setCursorPosition({ line, column });
    };

    return (
        <div ref={ref} className='dash-notes bg-white'>
            <div className="hb b-hb round" ref={movableRef}>
                <div className="hbb b-hbb" onMouseDown={onDragStart}>
                    <div className="hbbl">
                        <span>Notebook</span>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                </div>
                <div className='hb-2'>
                    <div className="expander" onMouseDown={onClick}>
                        <img src={ArrowDown} alt="Arrow Down" width={16} height={16}></img>
                    </div>
                    <div className="nb-page">
                        <CodePerfect chunk={noteContent} colorMap={colorMap} cssClass="highlight" currentLine={currentLine} />
                        <textarea
                            className="nb-txt"
                            spellCheck={false}
                            value={noteContent}
                            onChange={handleNoteContentChange}
                            onSelect={handleCursorPositionChange}
                            ref={textAreaRef}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default DashNotes;