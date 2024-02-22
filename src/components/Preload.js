import react from 'react';

import logo from './images/logo192.png';
import "./css/preload.css";


const Preload = ()=>{
    return (
        <>
            <div id='preload'>
                <img src={logo} width="100px" height="100px"/>
            </div>
        </>
    )
}

export default Preload;