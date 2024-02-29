import React from 'react';
import './Chat.css';
import ChatBar from './ChatBar';
import MaiChat from './MaiChat';

const Chat = ({setActiveTab}) => {
    return (
        <div className="ChatApp">
            <ChatBar setActiveTab={setActiveTab} />
            <MaiChat />
        </div>
    );

};

export default Chat;