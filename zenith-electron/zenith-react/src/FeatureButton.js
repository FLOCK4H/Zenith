import React from 'react';
import './FeatureButton.css'

const FeatureButton = ({ icon, title, text, css_class, onClickAction }) => {

    const onClick = (e) => {
        e.currentTarget.style.transform = "scale(1.2)";
        e.currentTarget.style.marginTop = "10px";
        if (onClickAction) onClickAction();
    }

    const onHover = (e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.marginBottom = "20px";
        e.currentTarget.style.marginTop = "5px";
        e.currentTarget.style.cursor = "pointer";
        e.currentTarget.style.boxShadow = "inset 0 50px 50px 0 rgba(0,0,35,0.4), 0 0 15px 2px rgba(0,100,150,0.6)";
    }

    const onHoverBack = (e) => {
        e.currentTarget.style.transform = "scale(1.0)";
        e.currentTarget.style.marginBottom = "0";
        e.currentTarget.style.marginTop = "0";
        e.currentTarget.style.boxShadow = "inset 0 50px 50px 0 rgba(0,0,35,0.2), 0 0 5px 2px rgba(0,100,150,0.2)";
    }

    return (
        <div className="main-rect" onMouseEnter={onHover} onMouseLeave={onHoverBack} onClick={onClick}>
            <div className="rect-icon">
                <img src={icon} alt="Feature Button" />
            </div>
            <div className="rect-content">
                <div className="button-desc">
                    <div className="button-title"><div className="dots"></div>{title}</div>
                    <div className={`button-text  ${css_class}`}>{text}</div>
                </div>
            </div>
        </div>
    );
};

export default FeatureButton;