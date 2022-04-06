import React from 'react';
import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = ({onRouteChange}) => {
    return (
        <header>
            <Logo />
            <nav>
                <input type="submit" value="Home" onClick={() => onRouteChange('home') } />
                <input type="submit" value="Profile" onClick={() => onRouteChange('profile') } />
                <input type="submit" value="Sign Out" onClick={() => onRouteChange() } />
            </nav>
        </header>
    )
}

export default Navigation;