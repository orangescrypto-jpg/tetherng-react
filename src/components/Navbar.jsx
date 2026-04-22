import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('tetherng_token');
        const user = localStorage.getItem('tetherng_user');
        if (token && user) {
            const userData = JSON.parse(user);
            setIsLoggedIn(true);
            setUserType(userData.type);
            setUserName(userData.fullName || userData.name || 'User');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('tetherng_token');
        localStorage.removeItem('tetherng_user');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo">🏠 Tether<span>ng</span></Link>
                <div className="nav-links">
                    <Link to="/">Find Property</Link>
                    <Link to="/agent-signup">List Property</Link>
                    <Link to="/about">About</Link>
                    
                    {!isLoggedIn ? (
                        <>
                            <Link to="/tenant-signin" className="btn-outline">Tenant Sign In</Link>
                            <Link to="/agent-signin" className="btn-outline">Agent Sign In</Link>
                        </>
                    ) : (
                        <>
                            <span className="user-greeting">👋 {userName}</span>
                            {userType === 'agent' && <Link to="/agent-dashboard">Dashboard</Link>}
                            {userType === 'tenant' && <Link to="/tenant-dashboard">Dashboard</Link>}
                            <button onClick={handleLogout} className="logout-btn">Logout</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
