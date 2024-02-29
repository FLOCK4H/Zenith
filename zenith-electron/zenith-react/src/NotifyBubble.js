import React from 'react';
import PropTypes from 'prop-types';
import './NotifyBubble.css'; // Assuming you have a CSS file for styling

const NotifyBubble = ({ img, text, css_class }) => {
    return (
        <div className={`bg-bubble round-n-size notify-bubble ${css_class}`}>
            {img && <img src={img} alt="Notification Icon" width={64} height={64}/>}
            <p>{text}</p>
        </div>
    );
};

NotifyBubble.propTypes = {
    img: PropTypes.string,
    text: PropTypes.string.isRequired,
    css_class: PropTypes.string
};

NotifyBubble.defaultProps = {
    img: null,
    css_class: ''
};

export default NotifyBubble;