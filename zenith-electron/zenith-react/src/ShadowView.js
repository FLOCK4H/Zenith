import React from 'react';
import './ShadowView.css';


const ShadowView = () => {

    const onClickHandle = (e) => {
        e.target.style.display = 'none';

    }

    return (
        <div className='view bg-blackA flex' onClick={onClickHandle}></div>
    )
}

export default ShadowView;