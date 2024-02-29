import React, {useState, useEffect} from 'react';
import './ChatBar.css';
import UserIcon from './user_icon.svg';
import { useUsername } from './UsernameContext';
import PreviousIcon from './chat_bar_icon.svg';


const ChatBar = ({setActiveTab}) => {
    const [isHovered, setHovered] = useState(false);
    const { username } = useUsername();

    const handleDashboardClick = () => {
        setActiveTab('Dashboard');
    };

    return (
        // main tower
        <div className={`m-t ${isHovered ? "expand": ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>  
            <div className="hpc">
                <div className="menu-button-container-mai">
                    <MenuButton icon={PreviousIcon} text="Dashboard" isHovered={isHovered} callback={handleDashboardClick}/>
                </div>
            </div>
            
            <div className="lpc">
                <div className={`profile-bg ${isHovered ? 'flex-start-gray': ''}`}>
                    <img src={UserIcon} alt="Profile" className="profile-pic" /> 
                    <div className={`username ${isHovered ? 'show' : ''}`}>
                        {username}
                    </div>
                </div>
            </div>
        </div>
    );
};

function MenuButton({ icon, text, isHovered, callback }) {
    return (
      <div className={`menu-button ${isHovered ? 'gap5': ''}`} onClick={callback}>
        <img src={icon} alt={text} className={`icon ${isHovered ? 'icon-small' : 'icon-large'}`} />
        <div className={`icon-container-menu-button ${isHovered ? 'width-mod' : ''}`}>
          <div className={`user-button-text ${isHovered ? 'show' : ''}`}>{text}</div>
        </div>
      </div>
    );
  }

export default ChatBar;