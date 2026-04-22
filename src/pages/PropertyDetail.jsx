import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProperty } from '../api';

function PropertyDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const loadProperty = useCallback(async () => {
        try {
            const data = await getProperty(id);
            setProperty(data.property);
            
            const user = localStorage.getItem('tetherng_user');
            if (user) {
                const userData = JSON.parse(user);
                if (userData.savedProperties && userData.savedProperties.includes(parseInt(id))) {
                    setIsSaved(true);
                }
            }
        } catch (error) {
            console.error('Error loading property:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadProperty();
    }, [loadProperty]);

    const saveProperty = () => {
        const token = localStorage.getItem('tetherng_token');
        const user = localStorage.getItem('tetherng_user');
        
        if (!token || !user) {
            alert('🔐 Please sign in as a tenant to save properties.');
            navigate('/tenant-signin');
            return;
        }
        
        const userData = JSON.parse(user);
        if (userData.type !== 'tenant') {
            alert('Only tenants can save properties. Please sign in as a tenant.');
            navigate('/tenant-signin');
            return;
        }
        
        let saved = userData.savedProperties || [];
        if (!saved.includes(parseInt(id))) {
            saved.push(parseInt(id));
            userData.savedProperties = saved;
            localStorage.setItem('tetherng_user', JSON.stringify(userData));
            setIsSaved(true);
            alert('❤️ Property saved to your dashboard!');
        } else {
            alert('This property is already in your saved list.');
        }
    };

    if (loading) return <div className="loading">Loading property details...</div>;
    if (!property) return <div className="empty-state">Property not found.</div>;

    return (
        <div className="detail-wrapper">
            <a href="/" className="back-link">← Back to Properties</a>

            <div className="property-detail-card">
                <div className="property-header">
                    <h1>{property.title}</h1>
                    <span className={`status-badge ${property.status === 'available' ? 'status-available' : 'status-rented'}`}>
                        {property.status === 'available' ? 'Available' : 'Rented'}
                    </span>
                </div>

                <div className="property-detail-content">
                    <div>
                        <div className="property-detail-image">{property.image || '🏠'}</div>
                    </div>

                    <div className="property-info">
                        <div className="property-price">{property.price}</div>
                        <div className="property-location">📍 {property.location}</div>

                        <div className="specs-grid">
                            <div className="spec-item">
                                <div className="spec-value">🛏️ {property.bedrooms}</div>
                                <div className="spec-label">Bedrooms</div>
                            </div>
                            <div className="spec-item">
                                <div className="spec-value">🛁 {property.bathrooms}</div>
                                <div className="spec-label">Bathrooms</div>
                            </div>
                            <div className="spec-item">
                                <div className="spec-value">📐 {property.size}</div>
                                <div className="spec-label">Size</div>
                            </div>
                        </div>

                        <div className="description">
                            <h3>Description</h3>
                            <p>{property.description || 'No description provided.'}</p>
                        </div>

                        <div className="agent-info">
                            <h3>Listed By</h3>
                            <p><strong>{property.agent_name || 'Verified Agent'}</strong></p>
                            <p>{property.agency_name || 'Real Estate Agency'}</p>
                            <p style={{ marginTop: '0.5rem' }}>✓ BVN/NIN Verified Agent</p>
                        </div>

                        <div className="action-buttons">
                            <a href={`/contact-agent/${property.id}`} className="btn-contact">
                                📞 Contact Agent
                            </a>
                            <button className="btn-save" onClick={saveProperty} disabled={isSaved}>
                                {isSaved ? '❤️ Saved' : '❤️ Save Property'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetail;
