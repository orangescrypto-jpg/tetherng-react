import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../api';
import PropertyCard from '../components/PropertyCard';

function TenantDashboard() {
    const [savedProperties, setSavedProperties] = useState([]);
    const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('tetherng_token');
        const userData = localStorage.getItem('tetherng_user');
        
        if (!token || !userData) {
            navigate('/tenant-signin');
            return;
        }
        
        const parsedUser = JSON.parse(userData);
        if (parsedUser.type !== 'tenant') {
            navigate('/tenant-signin');
            return;
        }
        
        setUser(parsedUser);
        loadData(parsedUser);
    }, [navigate]);

    const loadData = async (userData) => {
        try {
            const propertiesData = await getProperties();
            const allProps = propertiesData.properties || [];
            setAllProperties(allProps);
            
            const savedIds = userData.savedProperties || [];
            const saved = allProps.filter(p => savedIds.includes(p.id));
            setSavedProperties(saved);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeSavedProperty = (propertyId) => {
        const updatedSaved = savedProperties.filter(p => p.id !== propertyId);
        setSavedProperties(updatedSaved);
        
        const updatedUser = { ...user, savedProperties: updatedSaved.map(p => p.id) };
        localStorage.setItem('tetherng_user', JSON.stringify(updatedUser));
        
        alert('Property removed from your saved list.');
    };

    if (loading) return <div className="loading">Loading dashboard...</div>;
    if (!user) return null;

    return (
        <div className="dashboard-wrapper">
            <div className="welcome-card">
                <h1>Welcome back, {user.fullName}!</h1>
                <p>{user.email} • Preferred: {user.preferredLocation || 'All Nigeria'}</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-number">{savedProperties.length}</div>
                    <div className="stat-label">Saved Properties</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{allProperties.length}</div>
                    <div className="stat-label">Available Properties</div>
                </div>
            </div>

            <div className="section-header">
                <h2>❤️ Your Saved Properties</h2>
                <a href="/" className="btn-add">+ Find More Properties</a>
            </div>

            {savedProperties.length === 0 ? (
                <div className="empty-state">💔 No saved properties yet.<br /><br />Browse properties and click "❤️ Save Property" on any listing!</div>
            ) : (
                <div className="property-grid">
                    {savedProperties.map(property => (
                        <div key={property.id} className="property-card" style={{ position: 'relative' }}>
                            <PropertyCard property={property} />
                            <button 
                                className="btn-delete" 
                                onClick={() => removeSavedProperty(property.id)}
                                style={{ position: 'absolute', bottom: '1rem', right: '1rem', width: 'auto', padding: '0.5rem 1rem' }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TenantDashboard;
