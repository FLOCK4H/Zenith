import React from 'react';
import './FeatureBox.css';
import FeatureButton from './FeatureButton';
import AgentIvy from './agent_ivy.svg';
import AgentMai from './agent_mai.svg';
import AgentRuckus from './agent_ruckus.svg'

const FeatureBox = ({showChat}) => {
    return (
        <div className='feature-container'>
            <FeatureButton icon={AgentIvy} title="Speak with Ivy" text="Ivy is an interactive voice assistant" />
            <FeatureButton icon={AgentMai} title="Chat with Mai" text="Mai likes to just chat and chill" onClickAction={showChat} />
            <FeatureButton icon={AgentRuckus} title="Chat with Ruckus" text="Ruckus is an interactive assistant" />
        </div>

    )
};

export default FeatureBox;