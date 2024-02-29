import React, { useState, useRef } from 'react';
import './Dashboard.css';
import UserIcon from './user_icon.svg';
import PencilIcon from './pencil_icon.svg';
import IntroSection from './IntroSection';
import { useUsername } from './UsernameContext';
import TypeWrite from './TypeWrite';
import SprayEmoji from './SprayEmoji'
import Markdown from 'react-markdown'
import BackBubble from './BackBubble'
import ProfileBar from './ProfileBar';

// dashboard = 1, nav + buttons = 2

function Dashboard({ setActiveTab }) {


  return (
    <div className="dashboard">
            <ProfileBar /> 
      <IntroSection showChat={() => setActiveTab('Chat')} />

        <BackBubble right="50%" top="0"/>
        <BackBubble left="50%" top="50%"/>

      </div> 
  );
}

export default Dashboard;