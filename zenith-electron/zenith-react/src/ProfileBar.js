import React, { useState } from 'react';
import UserIcon from './user_icon.svg';
import { useUsername } from './UsernameContext';
import './ProfileBar.css';
import NickName from './nick_name.svg';
import ProfilePic from './change_pic.svg';
import LogOffIcon from './log_off.svg';
import SettingsIcon from './settings_icon.svg';


function ProfileBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { username } = useUsername();
  
  return (
    <div className={`profile-section bg-gloss ${isExpanded ? 'expanded' : ''}`} 
         onMouseEnter={() => setIsExpanded(true)} 
         onMouseLeave={() => setIsExpanded(false)}>
      <div className='menu-items'>
          <div className="menu-button-container">
            <MenuButton icon={LogOffIcon} text="Log Out" isExpanded={isExpanded} />        
            <MenuButton icon={SettingsIcon} text="Settings" isExpanded={isExpanded} />  
          </div>
      </div>
      <div className='user-items'>
        <div className="user-button-container">
          <UserButton icon={NickName} text="Edit Nickname" isExpanded={isExpanded} />
          <UserButton icon={ProfilePic} text="Change Picture" isExpanded={isExpanded} />
        </div>
        <div className={`profile-bg ${isExpanded ? 'flex-start-gray': ''}`}>
          <img src={UserIcon} alt="Profile" className="profile-pic" /> 
          <div className={`username ${isExpanded ? 'show' : ''}`}>{username}</div>
        </div>
      </div>
    </div>
  );
}

function MenuButton({ icon, text, isExpanded }) {
  return (
    <div className={`menu-button ${isExpanded ? 'gap5': ''}`}  >
      <img src={icon} alt={text} className={`icon ${isExpanded ? 'icon-small' : 'icon-large'}`} />
      <div className={`icon-container-menu-button ${isExpanded ? 'width-mod' : ''}`}>
        <div className={`user-button-text ${isExpanded ? 'show' : ''}`}>{text}</div>
      </div>
    </div>
  );
}

function UserButton({ icon, text, isExpanded }) {
  return (
    <div className={`user-button ${isExpanded ? 'gap5': ''}`}>
      <img src={icon} alt={text} className={`icon ${isExpanded ? 'icon-small' : 'icon-large'}`} />
      <div className={`icon-container-user-button ${isExpanded ? 'width-mod' : ''}`}>
        <div className={`user-button-text ${isExpanded ? 'show' : ''}`}>{text}</div>
      </div>
    </div>
  );
}

export default ProfileBar;