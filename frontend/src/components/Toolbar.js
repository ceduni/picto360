import React from 'react';
import './Toolbar.css';

const Toolbar = () => {
    return (
        <div className="toolbar">
            <div className="left-section">
                <img src="/logo_picto360.png" alt="Logo" className="logo" />
            </div>
            <div className="right-section">
                <button className="toolbar-button">Settings</button>
                <button className="toolbar-button">Done</button>
                <button className="toolbar-button">Save</button>
                <button className="toolbar-button">Export</button>
                <button className="toolbar-button">Share</button>
            </div>
        </div>
    );
};

export default Toolbar;
