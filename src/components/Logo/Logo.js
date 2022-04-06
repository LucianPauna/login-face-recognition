import React from 'react';
import Tilty from 'react-tilty';
import './Logo.css';
import LogoIcon from './Logo.svg';

const Logo = () => {
    return (
        <div className="LogoContainer">
            <Tilty className="Logo" reverse perspective={900} reset={true} glare={true} maxGlare={0.5}>
                <div className="Logo-inner">
                    <img src={LogoIcon} alt="logo" />
                </div>
            </Tilty>
        </div>
    )
}

export default Logo;