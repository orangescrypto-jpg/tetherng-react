import React from 'react';
import { useNavigate } from 'react-router-dom';

function PropertyCard({ property }) {
    const navigate = useNavigate();

    return (
        <div className="property-card" onClick={() => navigate(`/property/${property.id}`)}>
            <div className="property-image">{property.image || '🏠'}</div>
            <div className="property-info">
                <div className="property-price">{property.price}</div>
                <div className="property-title">{property.title}</div>
                <div className="property-location">📍 {property.location}</div>
                <div className="property-details">
                    <span>🛏️ {property.bedrooms} Beds</span>
                    <span>🛁 {property.bathrooms} Baths</span>
                    <span>📐 {property.size}</span>
                </div>
                {property.status === 'rented' && (
                    <span className="rented-badge">Rented</span>
                )}
            </div>
        </div>
    );
}

export default PropertyCard;
