import React from 'react';
import './Toolbar.css';
import { IoSettingsSharp, IoCheckmark, IoSaveOutline, IoShareSocialSharp } from "react-icons/io5";
import { PiExport } from "react-icons/pi";

const Toolbar: React.FC = () => {
    return (
        <div className="toolbar">
            <div className="left-section">
                <img src="/logo_picto360.png" alt="Logo" className="logo" />
            </div>
            <div className="right-section">
                <a href='#' className='toolbar-button'><IoCheckmark /></a>
                <a href='#' className='toolbar-button'><IoSettingsSharp /></a>
                <a href='#' className='toolbar-button'><IoSaveOutline /></a>
                <a href='#' className='toolbar-button'><PiExport /></a>
                <a href='#' className='toolbar-button'><IoShareSocialSharp /></a>
            </div>
        </div>
    );
};

export default Toolbar;
