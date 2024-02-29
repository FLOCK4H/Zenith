import React from 'react';
import './TitleBar.css';
import Logo from './rounded_logo.svg';
import MinimizeIcon from './mini_icon.svg';
import FullscreenIcon from './fullscreen_icon.svg';
import CloseIcon from './close_icon.svg';

function TitleBar() {
    const handleClose = () => window.electronAPI.closeWindow();
    const handleMinimize = () => window.electronAPI.minimizeWindow();
    const handleMaximize = () => window.electronAPI.maximizeWindow();
    const handleDoubleClick = () => {
      window.electronAPI.resizeWindow();
    };

    return (
        <div className="title-bar" onDoubleClick={handleDoubleClick}>
            <img src={Logo} alt="Zenith Logo" className="title-bar-logo" />
            <div className="title-bar-controls">
                <img src={MinimizeIcon} alt="Minimize" onClick={handleMinimize} />
                <img src={FullscreenIcon} alt="Fullscreen" onClick={handleMaximize} />
                <img src={CloseIcon} alt="Close" onClick={handleClose} />
            </div>
        </div>
    );
}

export default TitleBar;