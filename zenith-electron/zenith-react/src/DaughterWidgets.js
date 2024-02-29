import React, { useRef, useState } from "react";
import './DaughterWidgets.css';
import DashNotes from './DashNotes.js';

const DaughterWidgets = () => {
    const dashNotesRef = useRef(null);
    const [isDashNotesExpanded, setIsDashNotesExpanded] = useState(false);

    const toggleDashNotesHeight = () => {
        if (dashNotesRef.current) {
            const newHeight = isDashNotesExpanded ? "100%" : "150%";
            const newWidth = isDashNotesExpanded ? "250px" : "290px";
            dashNotesRef.current.style.height = newHeight;
            dashNotesRef.current.style.width = newWidth;
            setIsDashNotesExpanded(!isDashNotesExpanded);
        }
    };

    return (
        <div className="widget-container">
            <DashNotes ref={dashNotesRef} onClick={toggleDashNotesHeight}/>
        </div>
    );
};

export default DaughterWidgets;