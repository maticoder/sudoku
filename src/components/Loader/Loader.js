import React from 'react';

import './Loader.css';

function Loader(props) {
    return (
        <div className='loader'>
            <div className="triple-spinner"></div>
            <p className="loading">Loading...</p>
        </div>
    );
}

export default Loader;